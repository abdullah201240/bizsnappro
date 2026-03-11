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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your business profile, currency, and invoice settings
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {saved && (
          <Card className="mb-6 border-green-500 dark:border-green-700">
            <CardContent className="pt-6">
              <p className="text-green-600 dark:text-green-400">Settings saved successfully!</p>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs - Horizontal on mobile, vertical sidebar on desktop */}
          <div className="lg:w-56 flex-shrink-0">
            {/* Mobile: Horizontal scrollable tabs */}
            <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Desktop: Vertical sidebar */}
            <Card className="hidden lg:block">
              <CardContent className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Business Settings */}
            {activeTab === "business" && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>
                    Enter your business details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Business Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={settings.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Business Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_type">Business Type</Label>
                      <Select
                        name="business_type"
                        value={settings.business_type}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, business_type: value || "individual" }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                        placeholder="business@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={settings.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        name="website"
                        value={settings.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tax_id">Tax ID / VAT</Label>
                      <Input
                        id="tax_id"
                        type="text"
                        name="tax_id"
                        value={settings.tax_id}
                        onChange={handleChange}
                        placeholder="XX-XXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-3">Address</h3>
                    <div className="space-y-3">
                      <Input
                        type="text"
                        name="address_line1"
                        value={settings.address_line1}
                        onChange={handleChange}
                        placeholder="Street address"
                      />
                      <Input
                        type="text"
                        name="address_line2"
                        value={settings.address_line2}
                        onChange={handleChange}
                        placeholder="Apartment, suite, etc."
                      />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Input
                          type="text"
                          name="city"
                          value={settings.city}
                          onChange={handleChange}
                          placeholder="City"
                        />
                        <Input
                          type="text"
                          name="state"
                          value={settings.state}
                          onChange={handleChange}
                          placeholder="State"
                        />
                        <Input
                          type="text"
                          name="postal_code"
                          value={settings.postal_code}
                          onChange={handleChange}
                          placeholder="Postal Code"
                        />
                        <Input
                          type="text"
                          name="country"
                          value={settings.country}
                          onChange={handleChange}
                          placeholder="Country"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Locale & Currency Settings */}
            {activeTab === "locale" && (
              <Card>
                <CardHeader>
                  <CardTitle>Locale & Currency</CardTitle>
                  <CardDescription>
                    Set your timezone and currency preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        name="timezone"
                        value={settings.timezone}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value || "UTC" }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.id} value={tz.name}>
                              {tz.name} ({tz.offset})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="locale">Language</Label>
                      <Select
                        name="locale"
                        value={settings.locale}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, locale: value || "en" }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="bn">বাংলা</SelectItem>
                          <SelectItem value="hi">हिन्दी</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="default_currency">Default Currency</Label>
                      <Select
                        name="default_currency"
                        value={settings.default_currency}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, default_currency: value || "USD" }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name} ({currency.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_format">Date Format</Label>
                      <Select
                        name="date_format"
                        value={settings.date_format}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, date_format: value || "YYYY-MM-DD" }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YYYY-MM-DD">2024-12-31</SelectItem>
                          <SelectItem value="DD/MM/YYYY">31/12/2024</SelectItem>
                          <SelectItem value="MM/DD/YYYY">12/31/2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Invoice Settings */}
            {activeTab === "invoice" && (
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Settings</CardTitle>
                  <CardDescription>
                    Configure your invoice defaults
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoice_prefix">Invoice Prefix</Label>
                      <Input
                        id="invoice_prefix"
                        type="text"
                        name="invoice_prefix"
                        value={settings.invoice_prefix}
                        onChange={handleChange}
                        placeholder="INV-"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoice_start_number">Starting Number</Label>
                      <Input
                        id="invoice_start_number"
                        type="number"
                        name="invoice_start_number"
                        value={settings.invoice_start_number}
                        onChange={handleChange}
                        min={1}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoice_default_payment_terms">Payment Terms</Label>
                      <Select
                        name="invoice_default_payment_terms"
                        value={settings.invoice_default_payment_terms}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, invoice_default_payment_terms: value || "net30" }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="due_on_receipt">Due on Receipt</SelectItem>
                          <SelectItem value="net15">Net 15</SelectItem>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net45">Net 45</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                          <SelectItem value="net90">Net 90</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoice_default_tax_rate">Default Tax Rate (%)</Label>
                      <Input
                        id="invoice_default_tax_rate"
                        type="number"
                        name="invoice_default_tax_rate"
                        value={settings.invoice_default_tax_rate}
                        onChange={handleChange}
                        min={0}
                        max={100}
                        step={0.01}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoice_default_notes">Default Notes</Label>
                    <Textarea
                      id="invoice_default_notes"
                      name="invoice_default_notes"
                      value={settings.invoice_default_notes}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Thank you for your business!"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tax Settings */}
            {activeTab === "tax" && (
              <Card>
                <CardHeader>
                  <CardTitle>Tax Settings</CardTitle>
                  <CardDescription>
                    Configure your tax settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="enable_tax">Enable Tax (%)</Label>
                      <Input
                        id="enable_tax"
                        type="number"
                        name="enable_tax"
                        value={settings.enable_tax}
                        onChange={handleChange}
                        min={0}
                        max={100}
                        step={0.01}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tax_label">Tax Label</Label>
                      <Input
                        id="tax_label"
                        type="text"
                        name="tax_label"
                        value={settings.tax_label}
                        onChange={handleChange}
                        placeholder="Tax, VAT, GST"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="tax_number">Tax Number</Label>
                      <Input
                        id="tax_number"
                        type="text"
                        name="tax_number"
                        value={settings.tax_number}
                        onChange={handleChange}
                        placeholder="Your tax registration number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                className="gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
