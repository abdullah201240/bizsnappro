import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Receipt,
  FileSignature,
  Link as LinkIcon,
  QrCode,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Invoices",
    description: "Create professional invoices with custom details and line items",
    icon: FileText,
    href: "/invoices",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Expenses",
    description: "Track business expenses and generate reports for tax season",
    icon: Receipt,
    href: "/expenses",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Contracts",
    description: "Generate professional contract templates in minutes",
    icon: FileSignature,
    href: "/contracts",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    title: "Payments",
    description: "Create payment links for PayPal, Stripe, Venmo and more",
    icon: LinkIcon,
    href: "/payments",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "QR Codes",
    description: "Generate QR codes for invoices and instant payments",
    icon: QrCode,
    href: "/qrcode",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

const stats = [
  { label: "Invoices Created", value: "10K+", icon: FileText },
  { label: "Active Users", value: "5K+", icon: Users },
  { label: "Time Saved", value: "1000h", icon: Clock },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        </div>
        
        <div className="container px-4 sm:px-6">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border/50 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-foreground">Free forever • No signup required</span>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Run your business</span>
              <br />
              <span className="text-gradient from-blue-600 via-purple-600 to-pink-600">like a pro</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              All-in-one business toolkit for freelancers and small businesses. 
              Create invoices, track expenses, and manage contracts—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/invoices">
                <Button size="lg" className="h-12 px-8 text-base rounded-full bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transition-all">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/expenses">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-2">
                  Explore Tools
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Instant Setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-border/50 shadow-sm mb-3">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-28">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-4">
              <Zap className="h-3 w-3" />
              Powerful Tools
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Professional-grade tools designed to help you manage your business efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.href} href={feature.href} className="group">
                  <Card className="h-full border border-border/50 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <div className="flex items-center text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                        Get Started
                        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              See it in action
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Simple, intuitive interfaces that make business management a breeze
            </p>
          </div>
          
          <div className="grid gap-16 lg:gap-24">
            {/* Invoice */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-4">
                  <FileText className="h-3.5 w-3.5" />
                  Invoices
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  Create Professional Invoices in Seconds
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Generate beautiful, professional invoices with your branding. Add company details, 
                  client information, line items, and download as PDF instantly.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Custom invoice numbering", "Automatic tax calculation", "Professional PDF export", "Payment tracking"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/invoices">
                  <Button className="rounded-full">
                    Create Invoice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
                  <Card className="relative border border-border/50 shadow-elevated overflow-hidden">
                    <div className="p-6 sm:p-8">
                      <div className="flex justify-between items-start border-b border-border/50 pb-6 mb-6">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Invoice</p>
                          <p className="text-lg font-bold text-foreground">#INV-2024-0001</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">Acme Corp</p>
                          <p className="text-xs text-muted-foreground">hello@acme.com</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm py-2 border-b border-border/30">
                          <span className="text-muted-foreground">Website Design</span>
                          <span className="font-medium text-foreground">$2,500.00</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-border/30">
                          <span className="text-muted-foreground">Development</span>
                          <span className="font-medium text-foreground">$4,000.00</span>
                        </div>
                        <div className="flex justify-between text-sm py-2">
                          <span className="text-muted-foreground">Hosting (1 year)</span>
                          <span className="font-medium text-foreground">$240.00</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">Total</span>
                        <span className="text-2xl font-bold text-foreground">$6,740.00</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Expenses */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl" />
                  <Card className="relative border border-border/50 shadow-elevated overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Expenses</p>
                          <p className="text-3xl font-bold text-foreground">$12,450.00</p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                          <TrendingUp className="h-4 w-4" />
                          +12%
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Software", amount: "$4,560", color: "bg-blue-100 text-blue-700" },
                          { label: "Office", amount: "$2,340", color: "bg-purple-100 text-purple-700" },
                          { label: "Travel", amount: "$1,890", color: "bg-amber-100 text-amber-700" },
                          { label: "Marketing", amount: "$3,660", color: "bg-rose-100 text-rose-700" },
                        ].map((cat) => (
                          <div key={cat.label} className="p-3 rounded-xl bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">{cat.label}</p>
                            <p className="font-semibold text-foreground">{cat.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-4">
                  <Receipt className="h-3.5 w-3.5" />
                  Expenses
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  Track Every Penny
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Keep tabs on all your business spending. Categorize expenses, 
                  generate reports, and be prepared for tax season with organized records.
                </p>
                <ul className="space-y-3 mb-8">
                  {["10+ expense categories", "Visual breakdown charts", "Export to PDF/CSV", "Tax-ready reports"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/expenses">
                  <Button className="rounded-full">
                    Track Expenses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="container px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
            
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Start for free today
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Ready to streamline your business?
              </h2>
              <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg">
                Join thousands of freelancers and small businesses who trust BizSnapPro 
                for their daily operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/invoices">
                  <Button 
                    size="lg" 
                    className="h-12 px-8 text-base rounded-full bg-white text-slate-900 hover:bg-white/90 shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contracts">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 px-8 text-base rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    View Templates
                  </Button>
                </Link>
              </div>
              <p className="text-white/50 text-sm mt-8">
                No credit card required • All data stored locally on your device
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
