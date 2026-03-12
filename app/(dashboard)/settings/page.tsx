"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { Currency, Timezone } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Zod Schema for form validation
const settingsSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  business_type: z.string(),
  email: z.string().email("Invalid email").or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("Invalid URL").or(z.literal("")),
  tax_id: z.string().optional(),
  address_line1: z.string().optional(),
  address_line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string(),
  timezone: z.string(),
  locale: z.string(),
  default_currency: z.string(),
  date_format: z.string(),
  invoice_prefix: z.string(),
  invoice_start_number: z.coerce.number().min(1),
  invoice_default_payment_terms: z.string(),
  invoice_default_tax_rate: z.coerce.number().min(0).max(100),
  invoice_default_notes: z.string().optional(),
  invoice_default_terms: z.string().optional(),
  invoice_footer_text: z.string().optional(),
  tax_number: z.string().optional(),
  tax_label: z.string(),
  enable_tax: z.coerce.number().min(0).max(100),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const defaultValues = {
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
  date_format: "YYYY-MM-DD"
} satisfies SettingsFormData;

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"business" | "locale" | "invoice" | "tax">("business");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const watchedValues = watch();

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
          
          reset({
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
            tax_number: fullSettings.tax_number || "",
            tax_label: fullSettings.tax_label || "Tax",
            enable_tax: fullSettings.enable_tax || 0,
            date_format: fullSettings.date_format || "YYYY-MM-DD"
          });
        }
      } catch (err) {
        console.error("Error loading settings:", err);
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [user, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    if (!organizationId) return;
    
    const savePromise = saveAllSettings(organizationId, data as any);
    setIsSaving(true);
    
    toast.promise(savePromise, {
      loading: "Saving settings...",
      success: () => {
        reset(data);
        return "Settings saved successfully!";
      },
      error: (err) => {
        return "Failed to save settings. Please try again.";
      }
    });
    
    try {
      await savePromise;
    } catch (err) {
      // Error handled by toast.promise
    } finally {
      setIsSaving(false);
    }
  };

  const currencyOptions = useMemo(() => 
    currencies.map(c => ({ value: c.code, label: `${c.code} - ${c.name} (${c.symbol})` })),
    [currencies]
  );

  const timezoneOptions = useMemo(() => 
    timezones.map(tz => ({ value: tz.name, label: `${tz.name} (${tz.utc_offset})` })),
    [timezones]
  );

  if (authLoading || loading) {
    return <SettingsPageSkeleton />;
  }

  const tabs = [
    { id: "business", label: "Business", icon: Building2 },
    { id: "locale", label: "Locale & Currency", icon: Globe },
    { id: "invoice", label: "Invoice Settings", icon: FileText },
    { id: "tax", label: "Tax Settings", icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your business profile, currency, and invoice settings
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            type="submit" 
            form="settings-form"
            disabled={isSaving}
            className="gap-2 min-w-[140px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <form 
        id="settings-form" 
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 flex-shrink-0">
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
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
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
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
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

          <div className="flex-1 space-y-6">
            {activeTab === "business" && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Enter your business details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Business Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Your Business Name"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_type">Business Type</Label>
                      <SearchableSelect
                        value={watchedValues.business_type}
                        onValueChange={(v) => setValue("business_type", v, { shouldDirty: true })}
                        options={[
                          { value: "individual", label: "Individual / Sole Proprietor" },
                          { value: "llc", label: "LLC" },
                          { value: "corporation", label: "Corporation" },
                          { value: "partnership", label: "Partnership" }
                        ]}
                        placeholder="Select business type"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="business@example.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" {...register("phone")} placeholder="+1 234 567 8900" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        {...register("website")}
                        placeholder="https://example.com"
                        aria-invalid={!!errors.website}
                      />
                      {errors.website && (
                        <p className="text-sm text-destructive">{errors.website.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tax_id">Tax ID / VAT</Label>
                      <Input id="tax_id" {...register("tax_id")} placeholder="XX-XXXXXXX" />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold mb-3">Address</h3>
                    <div className="space-y-3">
                      <Input {...register("address_line1")} placeholder="Street address" />
                      <Input {...register("address_line2")} placeholder="Apartment, suite, etc." />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Input {...register("city")} placeholder="City" />
                        <Input {...register("state")} placeholder="State" />
                        <Input {...register("postal_code")} placeholder="Postal Code" />
                        <Input {...register("country")} placeholder="Country" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "locale" && (
              <Card>
                <CardHeader>
                  <CardTitle>Locale & Currency</CardTitle>
                  <CardDescription>Set your timezone and currency preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <SearchableSelect
                        value={watchedValues.timezone}
                        onValueChange={(v) => setValue("timezone", v, { shouldDirty: true })}
                        options={timezoneOptions}
                        placeholder="Select timezone"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="locale">Language</Label>
                      <SearchableSelect
                        value={watchedValues.locale}
                        onValueChange={(v) => setValue("locale", v, { shouldDirty: true })}
                        options={[
                          { value: "en", label: "English (US)" },
                          { value: "en-GB", label: "English (UK)" },
                          { value: "es", label: "Español" },
                          { value: "fr", label: "Français" },
                          { value: "de", label: "Deutsch" },
                          { value: "ar", label: "العربية" },
                          { value: "bn", label: "বাংলা" },
                          { value: "hi", label: "हिन्दी" },
                          { value: "ja", label: "日本語" },
                          { value: "zh", label: "中文" }
                        ]}
                        placeholder="Select language"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="default_currency">Default Currency</Label>
                      <SearchableSelect
                        value={watchedValues.default_currency}
                        onValueChange={(v) => setValue("default_currency", v, { shouldDirty: true })}
                        options={currencyOptions}
                        placeholder="Select currency"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_format">Date Format</Label>
                      <SearchableSelect
                        value={watchedValues.date_format}
                        onValueChange={(v) => setValue("date_format", v, { shouldDirty: true })}
                        options={[
                          { value: "YYYY-MM-DD", label: "2024-12-31" },
                          { value: "DD/MM/YYYY", label: "31/12/2024" },
                          { value: "MM/DD/YYYY", label: "12/31/2024" }
                        ]}
                        placeholder="Select date format"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "invoice" && (
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Settings</CardTitle>
                  <CardDescription>Configure your invoice defaults</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoice_prefix">Invoice Prefix</Label>
                      <Input {...register("invoice_prefix")} placeholder="INV-" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoice_start_number">Starting Number</Label>
                      <Input type="number" {...register("invoice_start_number")} min={1} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoice_default_payment_terms">Payment Terms</Label>
                      <SearchableSelect
                        value={watchedValues.invoice_default_payment_terms}
                        onValueChange={(v) => setValue("invoice_default_payment_terms", v, { shouldDirty: true })}
                        options={[
                          { value: "due_on_receipt", label: "Due on Receipt" },
                          { value: "net15", label: "Net 15" },
                          { value: "net30", label: "Net 30" },
                          { value: "net45", label: "Net 45" },
                          { value: "net60", label: "Net 60" },
                          { value: "net90", label: "Net 90" }
                        ]}
                        placeholder="Select payment terms"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoice_default_tax_rate">Default Tax Rate (%)</Label>
                      <Input type="number" step="0.01" {...register("invoice_default_tax_rate")} min={0} max={100} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoice_default_notes">Default Notes</Label>
                    <Textarea {...register("invoice_default_notes")} rows={3} placeholder="Thank you for your business!" />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "tax" && (
              <Card>
                <CardHeader>
                  <CardTitle>Tax Settings</CardTitle>
                  <CardDescription>Configure your tax settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="enable_tax">Enable Tax (%)</Label>
                      <Input type="number" step="0.01" {...register("enable_tax")} min={0} max={100} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tax_label">Tax Label</Label>
                      <Input {...register("tax_label")} placeholder="Tax, VAT, GST" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="tax_number">Tax Number</Label>
                      <Input {...register("tax_number")} placeholder="Your tax registration number" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 flex-shrink-0">
          <Card>
            <CardContent className="p-2 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
