import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port:3306,
  password: "parihar@5911",  
  database: "tiffin_delievery", 
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully!");
  }
});

export default db;