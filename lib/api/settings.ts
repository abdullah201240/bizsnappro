import { createClient } from '@/lib/supabase/client';
import { 
  Organization, 
  OrganizationSettings, 
  Profile,
  Currency,
  Timezone,
  SettingsFormData 
} from '@/lib/types/database';

/**
 * Get current user's organization
 */
export async function getOrganization(): Promise<Organization | null> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();
    
  if (!profile?.organization_id) return null;
  
  const { data: organization } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', profile.organization_id)
    .single();
    
  return organization;
}

/**
 * Get organization settings
 */
export async function getOrganizationSettings(organizationId: string): Promise<OrganizationSettings | null> {
  const supabase = createClient();
  
  const { data: settings } = await supabase
    .from('organization_settings')
    .select('*')
    .eq('organization_id', organizationId)
    .single();
    
  return settings;
}

/**
 * Update organization settings
 */
export async function updateOrganizationSettings(
  organizationId: string,
  settings: Partial<OrganizationSettings>
): Promise<OrganizationSettings> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('organization_settings')
    .update({
      ...settings,
      updated_at: new Date().toISOString()
    })
    .eq('organization_id', organizationId)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Update organization details
 */
export async function updateOrganization(
  organizationId: string,
  organization: Partial<Organization>
): Promise<Organization> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('organizations')
    .update({
      ...organization,
      updated_at: new Date().toISOString()
    })
    .eq('id', organizationId)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Get current user profile
 */
export async function getProfile(): Promise<Profile | null> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return profile;
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  profile: Partial<Profile>
): Promise<Profile> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...profile,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Get all currencies
 */
export async function getCurrencies(): Promise<Currency[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('currencies')
    .select('*')
    .eq('is_active', true)
    .order('name');
    
  if (error) throw new Error(error.message);
  return data || [];
}

/**
 * Get all timezones
 */
export async function getTimezones(): Promise<Timezone[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('timezones')
    .select('*')
    .eq('is_active', true)
    .order('name');
    
  if (error) throw new Error(error.message);
  return data || [];
}

/**
 * Save all settings (both organization and settings table)
 */
export async function saveAllSettings(
  organizationId: string,
  settings: SettingsFormData
): Promise<{ organization: Organization; orgSettings: OrganizationSettings }> {
  const supabase = createClient();
  
  // Update organization
  const { data: organization, error: orgError } = await supabase
    .from('organizations')
    .update({
      name: settings.name,
      email: settings.email,
      phone: settings.phone,
      website: settings.website,
      tax_id: settings.tax_id,
      business_type: settings.business_type,
      address_line1: settings.address_line1,
      address_line2: settings.address_line2,
      city: settings.city,
      state: settings.state,
      postal_code: settings.postal_code,
      country: settings.country,
      timezone: settings.timezone,
      locale: settings.locale,
      default_currency: settings.default_currency,
      updated_at: new Date().toISOString()
    })
    .eq('id', organizationId)
    .select()
    .single();
    
  if (orgError) throw new Error(orgError.message);
  
  // Update organization settings
  const { data: orgSettings, error: settingsError } = await supabase
    .from('organization_settings')
    .update({
      invoice_prefix: settings.invoice_prefix,
      invoice_start_number: settings.invoice_start_number,
      invoice_default_payment_terms: settings.invoice_default_payment_terms,
      invoice_default_tax_rate: settings.invoice_default_tax_rate,
      invoice_default_notes: settings.invoice_default_notes,
      invoice_default_terms: settings.invoice_default_terms,
      invoice_footer_text: settings.invoice_footer_text,
      tax_number: settings.tax_number,
      tax_label: settings.tax_label,
      enable_tax: settings.enable_tax,
      currency_decimal_separator: settings.currency_decimal_separator,
      currency_thousand_separator: settings.currency_thousand_separator,
      currency_symbol_position: settings.currency_symbol_position,
      date_format: settings.date_format,
      updated_at: new Date().toISOString()
    })
    .eq('organization_id', organizationId)
    .select()
    .single();
    
  if (settingsError) throw new Error(settingsError.message);
  
  return { organization: organization!, orgSettings: orgSettings! };
}

/**
 * Get full settings (organization + org_settings)
 */
export async function getFullSettings(organizationId: string) {
  const [organization, orgSettings] = await Promise.all([
    getOrganization(),
    getOrganizationSettings(organizationId)
  ]);
  
  if (!organization || !orgSettings) {
    throw new Error('Settings not found');
  }
  
  return {
    ...organization,
    ...orgSettings
  };
}
