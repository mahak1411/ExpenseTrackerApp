const incomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
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

        // Create new income entry
        const income = new incomeSchema({
            title,
            amount,
            type,
            category,
            description,
            date,
        });

        // Save to the database
        await income.save();
        res.status(200).json({ message: "Income added successfully", income });

        console.log("Income saved:", income);
    } catch (error) {
        console.error("Error saving income:", error);
        res.status(500).json({ message: "An error occurred while saving income" });
    }
};


exports.getIncomes = async (req, res) => {
    try {
        const incomes = await incomeSchema.find().sort({createdAt : -1});
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: "Internal Server error " });
             
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await incomeSchema.findByIdAndDelete(id);

        if (!income) {
            return res.status(404).json({ message: "Income record not found" });
        }

        return res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
