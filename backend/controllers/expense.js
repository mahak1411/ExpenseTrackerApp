const expenseSchema = require('../models/expenseModel');

exports.addExpense = async (req, res) => {
    const { title, amount, type, category, description, date } = req.body;

    try {
        // Validate required fields
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number greater than 0" });
        }

        // Create new expense entry
        const expense = new expenseSchema({
            title,
            amount,
            type,
            category,
            description,
            date,
        });

        // Save to the database
        await expense.save();
        res.status(200).json({ message: "expense added successfully", expense });

        console.log("expense saved:", expense);
    } catch (error) {
        console.error("Error saving expense:", error);
        res.status(500).json({ message: "An error occurred while saving expense" });
    }
};


exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseSchema.find().sort({ createtAt: -1 });
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: "Internal Server error " });

    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await expenseSchema.findByIdAndDelete(id);

        if (!expense) {
            return res.status(404).json({ message: "expense record not found" });
        }

        return res.status(200).json({ message: "expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
