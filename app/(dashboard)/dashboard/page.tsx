"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Users, 
  Receipt, 
  TrendingUp, 
  DollarSign, 
  Plus,
  Clock 
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { getOrganization } from "@/lib/api/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();
  const [organizationName, setOrganizationName] = useState("Your Business");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrg() {
      try {
        const org = await getOrganization();
        if (org?.name) {
          setOrganizationName(org.name);
        }
      } catch (e) {
        // Ignore
      } finally {
        setLoading(false);
      }
    }
    loadOrg();
  }, []);

  const stats = [
    { label: "Total Revenue", value: "$24,580", change: "+12.5%", icon: DollarSign },
    { label: "Total Expenses", value: "$8,420", change: "-3.2%", icon: Receipt },
    { label: "Net Profit", value: "$16,160", change: "+18.7%", icon: TrendingUp },
    { label: "Outstanding", value: "$5,280", change: "-5.1%", icon: Clock },
  ];

  const recentInvoices = [
    { id: "INV-001", customer: "Acme Corp", amount: "$2,500", status: "paid" },
    { id: "INV-002", customer: "Tech Solutions", amount: "$1,800", status: "pending" },
    { id: "INV-003", customer: "Global Industries", amount: "$3,200", status: "overdue" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with {organizationName}
          </p>
        </div>
        <Link href="/invoices/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-dashed rounded-lg">
              <p className="text-muted-foreground">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Link href="/invoices" className="text-sm text-muted-foreground hover:text-primary">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{invoice.customer}</p>
                    <p className="text-sm text-muted-foreground">{invoice.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        invoice.status === "paid" 
                          ? "bg-green-100 text-green-700"
                          : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Create Invoice", href: "/invoices/new", icon: FileText },
          { label: "Add Expense", href: "/expenses/new", icon: Receipt },
          { label: "Add Customer", href: "/customers/new", icon: Users },
          { label: "View Reports", href: "/reports", icon: TrendingUp },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <action.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
