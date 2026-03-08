"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Download, DollarSign, Receipt, TrendingUp, Calendar, Tag, Store } from "lucide-react";

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  vendor: string;
}

const categories = [
  { name: "Office Supplies", color: "bg-blue-100 text-blue-700" },
  { name: "Travel", color: "bg-amber-100 text-amber-700" },
  { name: "Meals & Entertainment", color: "bg-rose-100 text-rose-700" },
  { name: "Software & Subscriptions", color: "bg-purple-100 text-purple-700" },
  { name: "Equipment", color: "bg-emerald-100 text-emerald-700" },
  { name: "Marketing", color: "bg-pink-100 text-pink-700" },
  { name: "Utilities", color: "bg-cyan-100 text-cyan-700" },
  { name: "Professional Services", color: "bg-indigo-100 text-indigo-700" },
  { name: "Insurance", color: "bg-orange-100 text-orange-700" },
  { name: "Other", color: "bg-slate-100 text-slate-700" },
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-white">
        <div className="container py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50">
                  <Receipt className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expense Tracker</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Track Expenses</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage your business spending</p>
            </div>
            <Button onClick={handlePrint} variant="outline" className="rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-foreground">${totalExpenses.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50">
                  <Receipt className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                  <p className="text-2xl font-bold text-foreground">{expenses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold text-foreground">{topCategories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Add Expense Form */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 shadow-card sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Expense
                </CardTitle>
                <CardDescription>Record a business expense</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, date: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
                    <Tag className="h-3 w-3" />
                    Category
                  </Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) =>
                      setNewExpense({ ...newExpense, category: value || "Other" })
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
                    <Store className="h-3 w-3" />
                    Vendor
                  </Label>
                  <Input
                    placeholder="Where did you spend?"
                    value={newExpense.vendor}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, vendor: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">Description</Label>
                  <Textarea
                    placeholder="What was this expense for?"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, description: e.target.value })
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">Amount ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount || ""}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
                <Button onClick={addExpense} className="w-full rounded-lg bg-slate-900 hover:bg-slate-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Expenses List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Breakdown */}
            {topCategories.length > 0 && (
              <Card className="border-border/50 shadow-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {topCategories.map((cat) => (
                      <div key={cat.name} className="p-4 rounded-xl bg-muted/30 border border-border/30">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${cat.color}`}>
                          {cat.name}
                        </span>
                        <p className="text-lg font-bold text-foreground">${cat.amount.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Expense Table */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
                <div>
                  <CardTitle className="text-base font-semibold">Expense History</CardTitle>
                  <CardDescription>All recorded expenses</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Receipt className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No expenses recorded yet.</p>
                    <p className="text-sm text-muted-foreground">Add your first expense to get started!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/50">
                          <TableHead className="text-xs font-medium text-muted-foreground uppercase">Date</TableHead>
                          <TableHead className="text-xs font-medium text-muted-foreground uppercase">Category</TableHead>
                          <TableHead className="text-xs font-medium text-muted-foreground uppercase">Vendor</TableHead>
                          <TableHead className="text-xs font-medium text-muted-foreground uppercase">Description</TableHead>
                          <TableHead className="text-xs font-medium text-muted-foreground uppercase text-right">Amount</TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenses.map((expense) => (
                          <TableRow key={expense.id} className="border-border/30">
                            <TableCell className="whitespace-nowrap text-sm">{expense.date}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryMap[expense.category] || "bg-slate-100 text-slate-700"}`}>
                                {expense.category}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm max-w-[120px] truncate">{expense.vendor || "—"}</TableCell>
                            <TableCell className="text-sm max-w-[200px] truncate">{expense.description}</TableCell>
                            <TableCell className="text-right font-semibold whitespace-nowrap text-sm">
                              ${expense.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteExpense(expense.id)}
                                className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
