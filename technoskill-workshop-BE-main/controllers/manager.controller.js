const pg = require("../utils/connect");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

exports.register = async function register(req, res) {
  try {
    const { name, password } = req.body;
    const response = await pg.query(
        "INSERT INTO manager (name, password) VALUES ($1, $2) RETURNING *",
        [name, password]
    );
    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async function login(req, res) {
  try {
    const { name, password } = req.body;
    const response = await pg.query(
        "SELECT * FROM manager WHERE name = $1",
        [name]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = response.rows[0];
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.forgotPassword = async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const response = await pg.query(
        "SELECT * FROM manager WHERE email = $1",
        [email]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "OTP'll be sent" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//bagian ini fail 😭
exports.genOTP = async function genOTP(req, res) {
  try {
    const { email } = req.body;
    const secret = speakeasy.generateSecret({ length: 20 });
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
      digits: 4
    });

    await sendOTP(email, token);

    res.status(200).json({ message: "OTP sent to email", secret: secret.base32 });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verOTP = async function verOTP(req, res) {
  try {
    const { token, secret } = req.body;
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      digits: 4,
      window: 2
    });

    if (verified) {
      res.status(200).json({ verified: true });
    } else {
      res.status(400).json({ verified: false, error: "Invalid token" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`
  };

  await transporter.sendMail(mailOptions);
}
//bagian ini fail 😭


exports.editInformation = async function editInformation(req, res) {
  try {
    const { namee, rolePos, mobilePhone, email, address, name } = req.body;

    const response = await pg.query(
        "UPDATE manager SET namee = $1, rolePos = $2, mobilePhone = $3, email = $4, address = $5 WHERE name = $6 RETURNING *",
        [namee, rolePos, mobilePhone, email, address, name]
    );

    if (response.rows.length === 0) {
      return res.status(303).json({ error: "Manager not found" });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error updating manager info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};