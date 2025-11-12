import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// ✅ Register User
export const registerUser = (req, res) => {
    const { name, mobile, email, password, role, mealType, mealsCount, address } = req.body;

    if (!name || !mobile || !email || !password) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `
      INSERT INTO users 
      (full_name, mobile_number, email, password, meal_type, meals_per_day, state, city, area_colony, block, flat_house_apartment, address_saved, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

        db.query(
            insertQuery,
            [
                name,
                mobile,
                email,
                hashedPassword,
                mealType || "breakfast",
                mealsCount || 1,
                address?.state || "",
                address?.city || "",
                address?.area_colony || "",
                address?.block || "",
                address?.flat_house_apartment || "",
                0,
            ],
            (err) => {
                if (err) return res.status(500).json({ message: err.message });
                res.status(201).json({ message: "Registration successful!" });
            }
        );
    });
};

// ✅ Login (User / Delivery / Admin)
export const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Please provide email and password" });

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                role: user.role,
            },
        });
    });
};

// ✅ Get All Users (Admin Only)
export const getAllUsers = (req, res) => {
    const query = `
    SELECT id, full_name, mobile_number, email, meal_type, meals_per_day, state, city, area_colony, block, flat_house_apartment, address_saved, created_at
    FROM users
  `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

// ✅ Toggle MealEatAtMess (example optional)
export const toggleMealEatAtMess = (req, res) => {
    const { id } = req.params;
    const getUserQuery = "SELECT address_saved FROM users WHERE id = ?";
    db.query(getUserQuery, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });

        const current = results[0].address_saved;
        const updateQuery = "UPDATE users SET address_saved = ? WHERE id = ?";
        db.query(updateQuery, [!current, id], (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: "Address saved status toggled successfully" });
        });
    });
};