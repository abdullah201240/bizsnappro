// Database types for BizSnap Pro

export type InvoiceStatus = 
  | 'draft' 
  | 'sent' 
  | 'viewed' 
  | 'paid' 
  | 'partial' 
  | 'overdue' 
  | 'cancelled' 
  | 'refunded';

export type UserRole = 'owner' | 'admin' | 'manager' | 'member' | 'viewer';

export type CustomerType = 'individual' | 'business';

export type CategoryType = 'income' | 'expense';

export type PaymentMethod = 
  | 'cash' 
  | 'bank_transfer' 
  | 'card' 
  | 'paypal' 
  | 'stripe' 
  | 'other';

export type BusinessType = 
  | 'individual' 
  | 'llc' 
  | 'corporation' 
  | 'partnership';

export type CurrencySymbolPosition = 'before' | 'after';

export type PaymentTerms = 
  | 'due_on_receipt' 
  | 'net15' 
  | 'net30' 
  | 'net45' 
  | 'net60' 
  | 'net90';

// Organization
export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  tax_id: string | null;
  business_type: BusinessType | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string;
  timezone: string;
  locale: string;
  default_currency: string;
  created_at: string;
  updated_at: string;
}

// Organization Settings
export interface OrganizationSettings {
  id: string;
  organization_id: string;
  
  // Invoice settings
  invoice_prefix: string;
  invoice_start_number: number;
  invoice_default_payment_terms: PaymentTerms;
  invoice_default_tax_rate: number;
  invoice_default_notes: string | null;
  invoice_default_terms: string | null;
  invoice_footer_text: string | null;
  
  // Currency settings
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_symbol_position: CurrencySymbolPosition;
  
  // Date format
  date_format: string;
  
  // Tax settings
  tax_number: string | null;
  tax_label: string;
  enable_tax: number;
  
  created_at: string;
  updated_at: string;
}

// User Profile
export interface Profile {
  id: string;
  organization_id: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  is_active: boolean;
  email: string | null;
  created_at: string;
  updated_at: string;
}

// Currency
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimal_places: number;
  is_active: boolean;
}

// Exchange Rate
export interface ExchangeRate {
  id: string;
  organization_id: string | null;
  base_currency: string;
  target_currency: string;
  rate: number;
  effective_date: string;
  is_auto_updated: boolean;
  created_at: string;
}

// Timezone
export interface Timezone {
  id: number;
  name: string;
  utc_offset: string;
  is_active: boolean;
}

// Customer
export interface Customer {
  id: string;
  organization_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  customer_type: CustomerType;
  tax_id: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  notes: string | null;
  tags: string[] | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Category
export interface Category {
  id: string;
  organization_id: string;
  name: string;
  type: CategoryType;
  description: string | null;
  color: string | null;
  icon: string | null;
  is_system: boolean;
  is_active: boolean;
  created_at: string;
}

// Invoice
export interface Invoice {
  id: string;
  organization_id: string;
  invoice_number: string;
  customer_id: string;
  status: InvoiceStatus;
  
  // Financial
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total: number;
  amount_paid: number;
  currency: string;
  
  // Dates
  issue_date: string;
  due_date: string | null;
  paid_date: string | null;
  
  // Additional
  notes: string | null;
  terms: string | null;
  footer_text: string | null;
  
  created_by: string | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  customer?: Customer;
  items?: InvoiceItem[];
}

// Invoice Item
export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  tax_amount: number;
  amount: number;
  sort_order: number;
  created_at: string;
}

// Vendor
export interface Vendor {
  id: string;
  organization_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  website: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Expense
export interface Expense {
  id: string;
  organization_id: string;
  vendor_id: string | null;
  category_id: string | null;
  amount: number;
  currency: string;
  expense_date: string;
  description: string | null;
  receipt_url: string | null;
  is_tax_deductible: boolean;
  status: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  vendor?: Vendor;
  category?: Category;
}

// Income
export interface Income {
  id: string;
  organization_id: string;
  customer_id: string | null;
  invoice_id: string | null;
  category_id: string | null;
  amount: number;
  currency: string;
  payment_date: string;
  payment_method: PaymentMethod | null;
  reference_number: string | null;
  description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  customer?: Customer;
  invoice?: Invoice;
  category?: Category;
}

// Payment
export interface Payment {
  id: string;
  organization_id: string;
  invoice_id: string | null;
  amount: number;
  currency: string;
  payment_date: string;
  payment_method: PaymentMethod | null;
  reference_number: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  
  // Relations
  invoice?: Invoice;
}

// Combined Dashboard Stats
export interface DashboardStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  outstandingInvoices: number;
  overdueInvoices: number;
  revenueChange: number;
  expenseChange: number;
  profitChange: number;
}

// Chart Data
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesDataPoint {
  date: string;
  income: number;
  expense: number;
}

// Form types
export interface InvoiceFormData {
  customer_id: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  items: InvoiceItemFormData[];
  notes?: string;
  terms?: string;
  discount_amount?: number;
}

export interface InvoiceItemFormData {
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
}

export interface CustomerFormData {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  customer_type?: CustomerType;
  tax_id?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  notes?: string;
  tags?: string[];
}

export interface ExpenseFormData {
  vendor_id?: string;
  category_id?: string;
  amount: number;
  currency: string;
  expense_date: string;
  description?: string;
  receipt_url?: string;
  is_tax_deductible?: boolean;
}

export interface SettingsFormData {
  // Business Info
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  tax_id?: string;
  business_type?: BusinessType;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  
  // Locale
  timezone: string;
  locale: string;
  default_currency: string;
  
  // Invoice Settings
  invoice_prefix: string;
  invoice_start_number: number;
  invoice_default_payment_terms: PaymentTerms;
  invoice_default_tax_rate: number;
  invoice_default_notes?: string;
  invoice_default_terms?: string;
  invoice_footer_text?: string;
  
  // Tax
  tax_number?: string;
  tax_label?: string;
  enable_tax?: number;
  
  // Currency Display
  currency_decimal_separator?: string;
  currency_thousand_separator?: string;
  currency_symbol_position?: CurrencySymbolPosition;
  
  // Date
  date_format?: string;
}
