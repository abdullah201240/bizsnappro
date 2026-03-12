-- BizSnap Pro Database Schema
-- Phase 1: Organizations, Profiles, and Settings

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table (multi-tenant support)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    website VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    tax_id VARCHAR(100),
    business_type VARCHAR(50), -- 'individual', 'llc', 'corporation', 'partnership'
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(2) DEFAULT 'US',
    timezone VARCHAR(50) DEFAULT 'UTC',
    locale VARCHAR(10) DEFAULT 'en',
    default_currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organization settings table
CREATE TABLE IF NOT EXISTS organization_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    
    -- Invoice settings
    invoice_prefix VARCHAR(20) DEFAULT 'INV-',
    invoice_start_number INTEGER DEFAULT 1,
    invoice_default_payment_terms VARCHAR(20) DEFAULT 'net30',
    invoice_default_tax_rate DECIMAL(5,2) DEFAULT 0,
    invoice_default_notes TEXT,
    invoice_default_terms TEXT,
    invoice_footer_text TEXT,
    
    -- Currency settings
    currency_decimal_separator VARCHAR(5) DEFAULT '.',
    currency_thousand_separator VARCHAR(5) DEFAULT ',',
    currency_symbol_position VARCHAR(10) DEFAULT 'before', -- 'before' or 'after'
    
    -- Date format
    date_format VARCHAR(20) DEFAULT 'YYYY-MM-DD',
    
    -- Tax settings
    tax_number VARCHAR(100),
    tax_label VARCHAR(50) DEFAULT 'Tax',
    enable_tax DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(organization_id)
);

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(50),
    role VARCHAR(20) DEFAULT 'member', -- 'owner', 'admin', 'manager', 'member', 'viewer'
    is_active BOOLEAN DEFAULT true,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Currency exchange rates table
CREATE TABLE IF NOT EXISTS exchange_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    base_currency VARCHAR(3) NOT NULL,
    target_currency VARCHAR(3) NOT NULL,
    rate DECIMAL(20,8) NOT NULL,
    effective_date DATE DEFAULT CURRENT_DATE,
    is_auto_updated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(organization_id, base_currency, target_currency, effective_date)
);

-- Invoice status enum
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'viewed', 'paid', 'partial', 'overdue', 'cancelled', 'refunded');

-- Invoices table (enhanced)
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    invoice_number VARCHAR(50) NOT NULL,
    customer_id UUID NOT NULL,
    status invoice_status DEFAULT 'draft',
    
    -- Financial
    subtotal DECIMAL(15,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    total DECIMAL(15,2) DEFAULT 0,
    amount_paid DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Dates
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    paid_date DATE,
    
    -- Additional
    notes TEXT,
    terms TEXT,
    footer_text TEXT,
    
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(organization_id, invoice_number)
);

-- Invoice line items
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
    description VARCHAR(500) NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    amount DECIMAL(15,2) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    customer_type VARCHAR(20) DEFAULT 'business', -- 'individual', 'business'
    tax_id VARCHAR(100),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(2),
    notes TEXT,
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table (for income/expenses)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'income', 'expense'
    description TEXT,
    color VARCHAR(7), -- hex color
    icon VARCHAR(50),
    is_system BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(organization_id, name, type)
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    vendor_id UUID,
    category_id UUID REFERENCES categories(id),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    expense_date DATE DEFAULT CURRENT_DATE,
    description TEXT,
    receipt_url TEXT,
    is_tax_deductible BOOLEAN DEFAULT true,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(2),
    website VARCHAR(255),
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Income table
CREATE TABLE IF NOT EXISTS income (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    customer_id UUID,
    invoice_id UUID REFERENCES invoices(id),
    category_id UUID REFERENCES categories(id),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_date DATE DEFAULT CURRENT_DATE,
    payment_method VARCHAR(50), -- 'cash', 'bank_transfer', 'card', 'paypal', 'other'
    reference_number VARCHAR(100),
    description TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    invoice_id UUID REFERENCES invoices(id),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_date DATE DEFAULT CURRENT_DATE,
    payment_method VARCHAR(50),
    reference_number VARCHAR(100),
    notes TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_organization ON profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_invoices_organization ON invoices(organization_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_customers_organization ON customers(organization_id);
CREATE INDEX IF NOT EXISTS idx_expenses_organization ON expenses(organization_id);
CREATE INDEX IF NOT EXISTS idx_income_organization ON income(organization_id);
CREATE INDEX IF NOT EXISTS idx_categories_organization ON categories(organization_id);
CREATE INDEX IF NOT EXISTS idx_vendors_organization ON vendors(organization_id);

-- Row Level Security (RLS) Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE income ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Function to auto-create organization and settings for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    org_id UUID;
    slug_text VARCHAR(100);
BEGIN
    -- Generate slug from email or name
    slug_text := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        split_part(NEW.email, '@', 1)
    );
    slug_text := LOWER(REGEXP_REPLACE(slug_text, '[^a-z0-9]', '', 'g'));
    
    -- Create organization
    INSERT INTO organizations (name, slug, email)
    VALUES (
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        slug_text || '-' || LEFT(gen_random_uuid()::TEXT, 8),
        NEW.email
    )
    RETURNING id INTO org_id;
    
    -- Create organization settings
    INSERT INTO organization_settings (organization_id)
    VALUES (org_id);
    
    -- Create user profile
    INSERT INTO profiles (id, organization_id, full_name, email, role)
    VALUES (
        NEW.id,
        org_id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.email,
        'owner'
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE FUNCTION handle_user_signup()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email_confirmed_at IS NOT NULL THEN
        PERFORM handle_new_user();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_user_signup();

-- Insert default categories
CREATE OR REPLACE FUNCTION insert_default_categories(org_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Income categories
    INSERT INTO categories (organization_id, name, type, color, icon, is_system) VALUES
    (org_id, 'Sales', 'income', '#10B981', 'trending-up', true),
    (org_id, 'Services', 'income', '#3B82F6', 'briefcase', true),
    (org_id, 'Investments', 'income', '#8B5CF6', 'banknote', true),
    (org_id, 'Other Income', 'income', '#6B7280', 'plus-circle', true)
    ON CONFLICT DO NOTHING;
    
    -- Expense categories
    INSERT INTO categories (organization_id, name, type, color, icon, is_system) VALUES
    (org_id, 'Office Supplies', 'expense', '#EF4444', 'paperclip', true),
    (org_id, 'Travel', 'expense', '#F59E0B', 'plane', true),
    (org_id, 'Utilities', 'expense', '#10B981', 'zap', true),
    (org_id, 'Marketing', 'expense', '#3B82F6', 'megaphone', true),
    (org_id, 'Software', 'expense', '#8B5CF6', 'monitor', true),
    (org_id, 'Rent', 'expense', '#EC4899', 'home', true),
    (org_id, 'Salaries', 'expense', '#6366F1', 'users', true),
    (org_id, 'Other Expenses', 'expense', '#6B7280', 'more-horizontal', true)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Update trigger to insert default categories
CREATE OR REPLACE FUNCTION handle_org_created()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM insert_default_categories(NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_organization_created ON organizations;
CREATE TRIGGER on_organization_created
    AFTER INSERT ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION handle_org_created();

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_settings_updated_at BEFORE UPDATE ON organization_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_income_updated_at BEFORE UPDATE ON income
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Common currencies list
CREATE TABLE IF NOT EXISTS currencies (
    code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    decimal_places INTEGER DEFAULT 2,
    is_active BOOLEAN DEFAULT true
);

-- Insert common currencies
INSERT INTO currencies (code, name, symbol, decimal_places) VALUES
('USD', 'US Dollar', '$', 2),
('EUR', 'Euro', '€', 2),
('GBP', 'British Pound', '£', 2),
('BDT', 'Bangladeshi Taka', '৳', 2),
('INR', 'Indian Rupee', '₹', 2),
('JPY', 'Japanese Yen', '¥', 0),
('CNY', 'Chinese Yuan', '¥', 2),
('AUD', 'Australian Dollar', 'A$', 2),
('CAD', 'Canadian Dollar', 'C$', 2),
('SGD', 'Singapore Dollar', 'S$', 2),
('AED', 'UAE Dirham', 'د.إ', 2),
('SAR', 'Saudi Riyal', '﷼', 2),
('MYR', 'Malaysian Ringgit', 'RM', 2),
('THB', 'Thai Baht', '฿', 2),
('KRW', 'South Korean Won', '₩', 0),
('BRL', 'Brazilian Real', 'R$', 2),
('MXN', 'Mexican Peso', 'MX$', 2),
('ZAR', 'South African Rand', 'R', 2),
('NGN', 'Nigerian Naira', '₦', 2),
('PHP', 'Philippine Peso', '₱', 2)
ON CONFLICT (code) DO NOTHING;

-- Timezones list
CREATE TABLE IF NOT EXISTS timezones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    utc_offset VARCHAR(10) NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Common timezones
INSERT INTO timezones (name, utc_offset) VALUES
('UTC', '+00:00'),
('America/New_York', '-05:00'),
('America/Chicago', '-06:00'),
('America/Denver', '-07:00'),
('America/Los_Angeles', '-08:00'),
('America/Toronto', '-05:00'),
('America/Vancouver', '-08:00'),
('Europe/London', '+00:00'),
('Europe/Paris', '+01:00'),
('Europe/Berlin', '+01:00'),
('Europe/Amsterdam', '+01:00'),
('Asia/Dhaka', '+06:00'),
('Asia/Kolkata', '+05:30'),
('Asia/Singapore', '+08:00'),
('Asia/Hong_Kong', '+08:00'),
('Asia/Tokyo', '+09:00'),
('Asia/Seoul', '+09:00'),
('Asia/Dubai', '+04:00'),
('Asia/Bangkok', '+07:00'),
('Australia/Sydney', '+11:00'),
('Pacific/Auckland', '+13:00')
ON CONFLICT DO NOTHING;
