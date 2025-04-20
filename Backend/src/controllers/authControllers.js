const pool = require('../config/db');
const { generate2FACodeFromRandomImage } = require('../utils/image2FA');
const { send2FACode } = require('../utils/mailer');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const { code, imageName } = await generate2FACodeFromRandomImage();

    // Store 2FA code and timestamp
    await pool.query(
      'UPDATE users SET temp_2fa_code = $1, code_generated_at = NOW() WHERE id = $2',
      [code, user.id]
    );

    await send2FACode(user.email, code, imageName);

    res.json({ message: '2FA code sent to email', userId: user.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login error' });
  }
};

exports.verify2FACode = async (req, res) => {
  const { userId, code } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    const user = result.rows[0];

    if (!user || user.temp_2fa_code !== code) {
      return res.status(401).json({ message: 'Invalid 2FA code' });
    }

    res.json({ message: 'Login successful', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Verification error' });
  }
};
