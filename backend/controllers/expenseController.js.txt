import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user
  });
  res.json(expense);
};

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user });
  res.json(expenses);
};

export const updateExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(expense);
};

export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
};
