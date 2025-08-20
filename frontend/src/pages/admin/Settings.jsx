import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../utils/adminStorage';
import './Adminpage.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Flower Shop',
    siteDescription: 'Beautiful plants and flowers for your home',
    contactEmail: 'info@flowershop.com',
    contactPhone: '+1-234-567-8900',
    address: '123 Garden Street, Plant City, PC 12345',
    currency: 'USD',
    taxRate: 8.5,
    shippingRate: 15.00,
    freeShippingThreshold: 100,
    maintenanceMode: false,
    // Additional settings
    logoUrl: '',
    faviconUrl: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      pinterest: ''
    },
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    emailSettings: {
      smtpHost: '',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: '',
      fromName: ''
    },
    paymentSettings: {
      stripeEnabled: false,
      stripePublishableKey: '',
      stripeSecretKey: '',
      paypalEnabled: false,
      paypalClientId: '',
      cashOnDeliveryEnabled: true
    },
    seoSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      googleAnalyticsId: '',
      facebookPixelId: ''
    }
  });
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const settingsData = getSettings();
    setSettings(prevSettings => ({
      ...prevSettings,
      ...settingsData
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const success = updateSettings(settings);
      if (success) {
        alert('Settings updated successfully!');
      } else {
        alert('Failed to update settings.');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('An error occurred while updating settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'contact', label: 'Contact & Business' },
    { id: 'commerce', label: 'Commerce' },
    { id: 'social', label: 'Social Media' },
    { id: 'email', label: 'Email Settings' },
    { id: 'payment', label: 'Payment' },
    { id: 'seo', label: 'SEO' }
  ];

  return (
    <div className="admin-settings-container">
      <div className="admin-settings-card">
        <div className="admin-settings-header">
          <h2 className="admin-settings-title">Site Settings</h2>
          <button 
            type="submit" 
            form="settings-form"
            className={`admin-save-btn ${isSaving ? 'saving' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form id="settings-form" onSubmit={handleSubmit} className="settings-form">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3>General Settings</h3>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Site Name *</label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Currency</label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="LKR">LKR - Sri Lankan Rupee</option>
                  </select>
                </div>
                
                <div className="form-group full-width">
                  <label>Site Description</label>
                  <textarea
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                
                <div className="form-group">
                  <label>Logo URL</label>
                  <input
                    type="url"
                    name="logoUrl"
                    value={settings.logoUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div className="form-group">
                  <label>Favicon URL</label>
                  <input
                    type="url"
                    name="faviconUrl"
                    value={settings.faviconUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
                
                <div className="form-group checkbox-group full-width">
                  <label>
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                    Maintenance Mode (Site will be temporarily unavailable)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Contact & Business Settings */}
          {activeTab === 'contact' && (
            <div className="settings-section">
              <h3>Contact & Business Information</h3>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Contact Email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Business Address</label>
                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
              </div>
              
              <h4>Business Hours</h4>
              <div className="business-hours-grid">
                {Object.entries(settings.businessHours || {}).map(([day, hours]) => (
                  <div key={day} className="form-group">
                    <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                    <input
                      type="text"
                      name={`businessHours.${day}`}
                      value={hours}
                      onChange={handleChange}
                      placeholder="9:00 AM - 6:00 PM"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Commerce Settings */}
          {activeTab === 'commerce' && (
            <div className="settings-section">
              <h3>Commerce Settings</h3>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={settings.taxRate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Shipping Rate ($)</label>
                  <input
                    type="number"
                    name="shippingRate"
                    value={settings.shippingRate}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="form-group">
                  <label>Free Shipping Threshold ($)</label>
                  <input
                    type="number"
                    name="freeShippingThreshold"
                    value={settings.freeShippingThreshold}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media Settings */}
          {activeTab === 'social' && (
            <div className="settings-section">
              <h3>Social Media Links</h3>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Facebook URL</label>
                  <input
                    type="url"
                    name="socialMedia.facebook"
                    value={settings.socialMedia?.facebook || ''}
                    onChange={handleChange}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input
                    type="url"
                    name="socialMedia.instagram"
                    value={settings.socialMedia?.instagram || ''}
                    onChange={handleChange}
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
                
                <div className="form-group">
                  <label>Twitter URL</label>
                  <input
                    type="url"
                    name="socialMedia.twitter"
                    value={settings.socialMedia?.twitter || ''}
                    onChange={handleChange}
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
                
                <div className="form-group">
                  <label>Pinterest URL</label>
                  <input
                    type="url"
                    name="socialMedia.pinterest"
                    value={settings.socialMedia?.pinterest || ''}
                    onChange={handleChange}
                    placeholder="https://pinterest.com/yourpage"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="settings-section">
              <h3>Email Configuration</h3>
              <div className="settings-grid">
                <div className="form-group">
                  <label>SMTP Host</label>
                  <input
                    type="text"
                    name="emailSettings.smtpHost"
                    value={settings.emailSettings?.smtpHost || ''}
                    onChange={handleChange}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                
                <div className="form-group">
                  <label>SMTP Port</label>
                  <input
                    type="number"
                    name="emailSettings.smtpPort"
                    value={settings.emailSettings?.smtpPort || ''}
                    onChange={handleChange}
                    placeholder="587"
                  />
                </div>
                
                <div className="form-group">
                  <label>SMTP Username</label>
                  <input
                    type="text"
                    name="emailSettings.smtpUsername"
                    value={settings.emailSettings?.smtpUsername || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>SMTP Password</label>
                  <input
                    type="password"
                    name="emailSettings.smtpPassword"
                    value={settings.emailSettings?.smtpPassword || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>From Email</label>
                  <input
                    type="email"
                    name="emailSettings.fromEmail"
                    value={settings.emailSettings?.fromEmail || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>From Name</label>
                  <input
                    type="text"
                    name="emailSettings.fromName"
                    value={settings.emailSettings?.fromName || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="settings-section">
              <h3>Payment Gateway Settings</h3>
              
              <div className="payment-section">
                <h4>Stripe</h4>
                <div className="settings-grid">
                  <div className="form-group checkbox-group full-width">
                    <label>
                      <input
                        type="checkbox"
                        name="paymentSettings.stripeEnabled"
                        checked={settings.paymentSettings?.stripeEnabled || false}
                        onChange={handleChange}
                      />
                      Enable Stripe Payments
                    </label>
                  </div>
                  
                  {settings.paymentSettings?.stripeEnabled && (
                    <>
                      <div className="form-group">
                        <label>Stripe Publishable Key</label>
                        <input
                          type="text"
                          name="paymentSettings.stripePublishableKey"
                          value={settings.paymentSettings?.stripePublishableKey || ''}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Stripe Secret Key</label>
                        <input
                          type="password"
                          name="paymentSettings.stripeSecretKey"
                          value={settings.paymentSettings?.stripeSecretKey || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="payment-section">
                <h4>PayPal</h4>
                <div className="settings-grid">
                  <div className="form-group checkbox-group full-width">
                    <label>
                      <input
                        type="checkbox"
                        name="paymentSettings.paypalEnabled"
                        checked={settings.paymentSettings?.paypalEnabled || false}
                        onChange={handleChange}
                      />
                      Enable PayPal Payments
                    </label>
                  </div>
                  
                  {settings.paymentSettings?.paypalEnabled && (
                    <div className="form-group">
                      <label>PayPal Client ID</label>
                      <input
                        type="text"
                        name="paymentSettings.paypalClientId"
                        value={settings.paymentSettings?.paypalClientId || ''}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="payment-section">
                <h4>Cash on Delivery</h4>
                <div className="settings-grid">
                  <div className="form-group checkbox-group full-width">
                    <label>
                      <input
                        type="checkbox"
                        name="paymentSettings.cashOnDeliveryEnabled"
                        checked={settings.paymentSettings?.cashOnDeliveryEnabled || false}
                        onChange={handleChange}
                      />
                      Enable Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="settings-section">
              <h3>SEO & Analytics</h3>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="seoSettings.metaTitle"
                    value={settings.seoSettings?.metaTitle || ''}
                    onChange={handleChange}
                    placeholder="Your site title for search engines"
                  />
                </div>
                
                <div className="form-group">
                  <label>Meta Keywords</label>
                  <input
                    type="text"
                    name="seoSettings.metaKeywords"
                    value={settings.seoSettings?.metaKeywords || ''}
                    onChange={handleChange}
                    placeholder="plants, flowers, gardening"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Meta Description</label>
                  <textarea
                    name="seoSettings.metaDescription"
                    value={settings.seoSettings?.metaDescription || ''}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Description for search engines"
                  />
                </div>
                
                <div className="form-group">
                  <label>Google Analytics ID</label>
                  <input
                    type="text"
                    name="seoSettings.googleAnalyticsId"
                    value={settings.seoSettings?.googleAnalyticsId || ''}
                    onChange={handleChange}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </div>
                
                <div className="form-group">
                  <label>Facebook Pixel ID</label>
                  <input
                    type="text"
                    name="seoSettings.facebookPixelId"
                    value={settings.seoSettings?.facebookPixelId || ''}
                    onChange={handleChange}
                    placeholder="123456789012345"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;