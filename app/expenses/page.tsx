"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Download, Receipt, TrendingUp, Calendar, Tag, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  vendor: string;
}

const categories = [
  { name: "Office Supplies", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "Travel", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { name: "Meals & Entertainment", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  { name: "Software & Subscriptions", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { name: "Equipment", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { name: "Marketing", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  { name: "Utilities", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { name: "Professional Services", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  { name: "Insurance", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { name: "Other", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
];

const categoryMap = Object.fromEntries(categories.map(c => [c.name, c.color]));

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().split("T")[0],
    category: "Other",
    description: "",
    amount: 0,
    vendor: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("bizsnappro_expenses");
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load expenses", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bizsnappro_expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      date: newExpense.date || new Date().toISOString().split("T")[0],
      category: newExpense.category || "Other",
      description: newExpense.description || "",
      amount: newExpense.amount || 0,
      vendor: newExpense.vendor || "",
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      category: "Other",
      description: "",
      amount: 0,
      vendor: "",
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const expensesByCategory = categories.reduce((acc, cat) => {
    acc[cat.name] = expenses
      .filter((e) => e.category === cat.name)
      .reduce((sum, e) => sum + e.amount, 0);
    return acc;
  }, {} as Record<string, number>);

  const topCategories = categories
    .map(cat => ({ name: cat.name, amount: expensesByCategory[cat.name], color: cat.color }))
    .filter(cat => cat.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-emerald-500/8 to-transparent border-b border-white/6 relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-10 py-8">
          <h1 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-2">Track Expenses</h1>
          <p className="text-sm text-white/50">Monitor and manage your business spending</p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 md:px-10 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/50">Total Expenses</p>
                <p className="text-2xl font-bold text-white">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-white/50">Total Entries</p>
                <p className="text-2xl font-bold text-white">{expenses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
                <Tag className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-white/50">Categories</p>
                <p className="text-2xl font-bold text-white">{topCategories.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Add Expense Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl sticky top-6 p-6">
              <h2 className="font-syne text-base font-bold text-white mb-1 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Expense
              </h2>
              <p className="text-xs text-white/40 mb-5">Record a business expense</p>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Date</Label>
                  <Input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Category</Label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl h-11 px-3 text-sm text-white focus:border-emerald-500/50 focus:ring-emerald-500/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name} className="bg-[#05050a]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Vendor</Label>
                  <Input
                    placeholder="Where did you spend?"
                    value={newExpense.vendor}
                    onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Description</Label>
                  <Textarea
                    placeholder="What was this expense for?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 min-h-[80px] resize-none"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Amount ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount || ""}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                  />
                </div>
                
                <button 
                  onClick={addExpense}
                  className="w-full h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>
            </div>
          </div>

          {/* Expenses List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Breakdown */}
            {topCategories.length > 0 && (
              <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-6">
                <h2 className="font-syne text-base font-bold text-white mb-4">Spending by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {topCategories.map((cat) => (
                    <div key={cat.name} className="p-4 rounded-xl bg-white/5 border border-white/6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 border ${cat.color}`}>
                        {cat.name}
                      </span>
                      <p className="text-lg font-bold text-white">${cat.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expense Table */}
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/6 flex items-center justify-between">
                <div>
                  <h2 className="font-syne text-base font-bold text-white">Expense History</h2>
                  <p className="text-xs text-white/40 mt-0.5">All recorded expenses</p>
                </div>
                <button 
                  onClick={handlePrint}
                  className="hidden md:flex items-center gap-2 px-4 h-10 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
              
              <div className="p-6">
                {expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
                      <Receipt className="w-8 h-8 text-white/30" />
                    </div>
                    <p className="text-white/50">No expenses recorded yet.</p>
                    <p className="text-sm text-white/30 mt-1">Add your first expense to get started!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/8">
                          <th className="text-left py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Date</th>
                          <th className="text-left py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Category</th>
                          <th className="text-left py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Vendor</th>
                          <th className="text-left py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Description</th>
                          <th className="text-right py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Amount</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense) => (
                          <tr key={expense.id} className="border-b border-white/4">
                            <td className="py-3 text-sm text-white/80 whitespace-nowrap">{expense.date}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${categoryMap[expense.category] || "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
                                {expense.category}
                              </span>
                            </td>
                            <td className="py-3 text-sm text-white/60 max-w-[120px] truncate">{expense.vendor || "—"}</td>
                            <td className="py-3 text-sm text-white/60 max-w-[200px] truncate">{expense.description}</td>
                            <td className="py-3 text-right font-semibold text-sm text-white whitespace-nowrap">
                              ${expense.amount.toFixed(2)}
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => deleteExpense(expense.id)}
                                className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
