import { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { adminApi } from "../../lib/api";

export default function AdminSettings() {
  const { token } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    announcementLeft: "",
    announcementCenter: "",
    announcementActive: true,
    // (Other settings like heroImage can stay here too)
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await adminApi.getSettings(token);
        setSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [token]);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSettings({ ...settings, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateSettings(token, settings);
      alert("Settings updated successfully! Changes will reflect on the live site.");
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-4xl mb-2">Site Settings</h1>
        <p className="text-charcoal/60 font-light">Manage your store's announcements and content.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* ANNOUNCEMENT BAR */}
        <div className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-2xl">Announcement Bar</h2>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input 
                type="checkbox" 
                name="announcementActive" 
                checked={settings.announcementActive || false} 
                onChange={handleChange}
                className="w-4 h-4 accent-charcoal"
              />
              Show on site
            </label>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal/70 mb-1">Left Text (Shipping Info)</label>
            <input name="announcementLeft" value={settings.announcementLeft || ""} onChange={handleChange} className="w-full border border-sand p-3 rounded-lg text-sm" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal/70 mb-1">Center Text (Promotions)</label>
            <input name="announcementCenter" value={settings.announcementCenter || ""} onChange={handleChange} className="w-full border border-sand p-3 rounded-lg text-sm" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-charcoal text-cream px-8 py-4 rounded-lg text-xs tracking-widest uppercase hover:bg-taupe transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}