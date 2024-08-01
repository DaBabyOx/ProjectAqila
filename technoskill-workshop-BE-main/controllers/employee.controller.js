const pg = require("../utils/connect");

exports.addEmployee = async function addEmployee(req, res) {
  try {

    const { firstName, lastName, email, mobilePhone, rolePos, address } = req.body;
    const response = await pg.query(
        "INSERT INTO employee (firstName, lastName, email, mobilePhone, rolePos, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [firstName, lastName, email, mobilePhone, rolePos, address]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEmployee = async function getEmployee(req, res) {
  try {
    const response = await pg.query("SELECT * FROM employee");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};