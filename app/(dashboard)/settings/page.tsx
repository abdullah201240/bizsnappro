"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  Building2, 
  Globe, 
  FileText, 
  DollarSign,
  Loader2
} from "lucide-react";
import { 
  getFullSettings, 
  getCurrencies, 
  getTimezones, 
  saveAllSettings,
  getProfile 
} from "@/lib/api/settings";
import { useAuth } from "@/components/providers/auth-provider";
import { 
  Currency, 
  Timezone, 
  SettingsFormData
} from "@/lib/types/database";

const defaultSettings: SettingsFormData = {
  name: "",
  email: "",
  phone: "",
  website: "",
  tax_id: "",
  business_type: "individual",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "US",
  timezone: "UTC",
  locale: "en",
  default_currency: "USD",
  invoice_prefix: "INV-",
  invoice_start_number: 1,
  invoice_default_payment_terms: "net30",
  invoice_default_tax_rate: 0,
  invoice_default_notes: "",
  invoice_default_terms: "",
  invoice_footer_text: "",
  tax_number: "",
  tax_label: "Tax",
  enable_tax: 0,
  currency_decimal_separator: ".",
  currency_thousand_separator: ",",
  currency_symbol_position: "before",
  date_format: "YYYY-MM-DD"
};

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<SettingsFormData>(defaultSettings);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<"business" | "locale" | "invoice" | "tax">("business");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      
      try {
        const [currenciesData, timezonesData, profile] = await Promise.all([
          getCurrencies(),
          getTimezones(),
          getProfile()
        ]);
        
        setCurrencies(currenciesData);
        setTimezones(timezonesData);
        
        if (profile?.organization_id) {
          setOrganizationId(profile.organization_id);
          const fullSettings = await getFullSettings(profile.organization_id);
          
          setSettings({
            name: fullSettings.name || "",
            email: fullSettings.email || "",
            phone: fullSettings.phone || "",
            website: fullSettings.website || "",
            tax_id: fullSettings.tax_id || "",
            business_type: fullSettings.business_type || "individual",
            address_line1: fullSettings.address_line1 || "",
            address_line2: fullSettings.address_line2 || "",
            city: fullSettings.city || "",
            state: fullSettings.state || "",
            postal_code: fullSettings.postal_code || "",
            country: fullSettings.country || "US",
            timezone: fullSettings.timezone || "UTC",
            locale: fullSettings.locale || "en",
            default_currency: fullSettings.default_currency || "USD",
            invoice_prefix: fullSettings.invoice_prefix || "INV-",
            invoice_start_number: fullSettings.invoice_start_number || 1,
            invoice_default_payment_terms: fullSettings.invoice_default_payment_terms || "net30",
            invoice_default_tax_rate: fullSettings.invoice_default_tax_rate || 0,
            invoice_default_notes: fullSettings.invoice_default_notes || "",
            invoice_default_terms: fullSettings.invoice_default_terms || "",
            invoice_footer_text: fullSettings.invoice_footer_text || "",
            tax_number: fullSettings.tax_number || "",
            tax_label: fullSettings.tax_label || "Tax",
            enable_tax: fullSettings.enable_tax || 0,
            currency_decimal_separator: fullSettings.currency_decimal_separator || ".",
            currency_thousand_separator: fullSettings.currency_thousand_separator || ",",
            currency_symbol_position: fullSettings.currency_symbol_position || "before",
            date_format: fullSettings.date_format || "YYYY-MM-DD"
          });
        }
      } catch (err) {
        console.error("Error loading settings:", err);
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value
    }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId) return;
    
    setSaving(true);
    setError(null);
    
    try {
      await saveAllSettings(organizationId, settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const tabs = [
    { id: "business", label: "Business", icon: Building2 },
    { id: "locale", label: "Locale & Currency", icon: Globe },
    { id: "invoice", label: "Invoice Settings", icon: FileText },
    { id: "tax", label: "Tax Settings", icon: DollarSign }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-600">
          Manage your business profile, currency, and invoice settings
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            Settings saved successfully!
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:w-56 flex-shrink-0">
            <nav className="space-y-1 bg-white rounded-lg shadow p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-700 border-l-2 border-indigo-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Business Settings */}
            {activeTab === "business" && (
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={settings.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your Business Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type
                    </label>
                    <select
                      name="business_type"
                      value={settings.business_type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="individual">Individual / Sole Proprietor</option>
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="business@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={settings.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={settings.website}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / VAT</label>
                    <input
                      type="text"
                      name="tax_id"
                      value={settings.tax_id}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="XX-XXXXXXX"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="address_line1"
                      value={settings.address_line1}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Street address"
                    />
                    <input
                      type="text"
                      name="address_line2"
                      value={settings.address_line2}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Apartment, suite, etc."
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        name="city"
                        value={settings.city}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="state"
                        value={settings.state}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        name="postal_code"
                        value={settings.postal_code}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Postal Code"
                      />
                      <input
                        type="text"
                        name="country"
                        value={settings.country}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Locale & Currency Settings */}
            {activeTab === "locale" && (
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Locale & Currency</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {timezones.map((tz) => (
                        <option key={tz.id} value={tz.name}>
                          {tz.name} ({tz.offset})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      name="locale"
                      value={settings.locale}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="en">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ar">العربية</option>
                      <option value="bn">বাংলা</option>
                      <option value="hi">हिन्दी</option>
                      <option value="ja">日本語</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                    <select
                      name="default_currency"
                      value={settings.default_currency}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                    <select
                      name="date_format"
                      value={settings.date_format}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="YYYY-MM-DD">2024-12-31</option>
                      <option value="DD/MM/YYYY">31/12/2024</option>
                      <option value="MM/DD/YYYY">12/31/2024</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Invoice Settings */}
            {activeTab === "invoice" && (
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Invoice Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Prefix</label>
                    <input
                      type="text"
                      name="invoice_prefix"
                      value={settings.invoice_prefix}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="INV-"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Starting Number</label>
                    <input
                      type="number"
                      name="invoice_start_number"
                      value={settings.invoice_start_number}
                      onChange={handleChange}
                      min={1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <select
                      name="invoice_default_payment_terms"
                      value={settings.invoice_default_payment_terms}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="due_on_receipt">Due on Receipt</option>
                      <option value="net15">Net 15</option>
                      <option value="net30">Net 30</option>
                      <option value="net45">Net 45</option>
                      <option value="net60">Net 60</option>
                      <option value="net90">Net 90</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Tax Rate (%)</label>
                    <input
                      type="number"
                      name="invoice_default_tax_rate"
                      value={settings.invoice_default_tax_rate}
                      onChange={handleChange}
                      min={0}
                      max={100}
                      step={0.01}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Notes</label>
                  <textarea
                    name="invoice_default_notes"
                    value={settings.invoice_default_notes}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Thank you for your business!"
                  />
                </div>
              </div>
            )}

            {/* Tax Settings */}
            {activeTab === "tax" && (
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Tax Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enable Tax (%)</label>
                    <input
                      type="number"
                      name="enable_tax"
                      value={settings.enable_tax}
                      onChange={handleChange}
                      min={0}
                      max={100}
                      step={0.01}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Label</label>
                    <input
                      type="text"
                      name="tax_label"
                      value={settings.tax_label}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Tax, VAT, GST"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Number</label>
                    <input
                      type="text"
                      name="tax_number"
                      value={settings.tax_number}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your tax registration number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
