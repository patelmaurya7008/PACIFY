import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  SlidersHorizontal,
  Save,
  RotateCcw,
  Check,
  Building,
  Phone,
  DollarSign,
  Info,
  Copy,
} from 'lucide-react';
import { VenueEvent } from '../types';

export const ContentEditorModal: React.FC = () => {
  const {
    isEditorOpen,
    setIsEditorOpen,
    settings,
    updateSettings,
    venues,
    setVenues,
    resetAllToDefault,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'contact' | 'venues' | 'prices'>('contact');
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || '');
  const [saveToast, setSaveToast] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Local draft of settings
  const [draftSettings, setDraftSettings] = useState(settings);

  // Local draft of selected venue
  const selectedVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];
  const [draftVenue, setDraftVenue] = useState<VenueEvent>(selectedVenue);

  if (!isEditorOpen) return null;

  const handleVenueSelect = (id: string) => {
    setSelectedVenueId(id);
    const target = venues.find((v) => v.id === id);
    if (target) setDraftVenue(target);
  };

  const handleSaveContact = () => {
    updateSettings(draftSettings);
    triggerSaveToast();
  };

  const handleSaveVenue = () => {
    setVenues((prev) =>
      prev.map((v) => (v.id === draftVenue.id ? { ...draftVenue } : v))
    );
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const copyConfigAsJson = () => {
    const fullConfig = {
      settings: draftSettings,
      venues,
    };
    navigator.clipboard.writeText(JSON.stringify(fullConfig, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-stone-900">
                Live Content & Pricing Manager
              </h3>
              <p className="text-[11px] text-stone-500">
                Instantly update contact numbers, pass prices, dates & venue details
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditorOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 pt-3 border-b border-stone-200 bg-stone-50/50 gap-2">
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Contact & Social Info
          </button>
          <button
            onClick={() => setActiveTab('venues')}
            className={`pb-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
              activeTab === 'venues'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Venue Details & Prices
          </button>
          <button
            onClick={() => setActiveTab('prices')}
            className={`pb-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
              activeTab === 'prices'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Pricing Format Options
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                <span>
                  Replace the default placeholders with your actual business contact info. Changes save immediately to your browser!
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Brand Name / Logo Title
                </label>
                <input
                  type="text"
                  value={draftSettings.brandName}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, brandName: e.target.value })
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number (Placeholder)
                  </label>
                  <input
                    type="text"
                    value={draftSettings.phone}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, phone: e.target.value })
                    }
                    placeholder="[682764782364]"
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white font-mono text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={draftSettings.whatsapp}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, whatsapp: e.target.value })
                    }
                    placeholder="[682764782364]"
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white font-mono text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (Placeholder)
                  </label>
                  <input
                    type="text"
                    value={draftSettings.email}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, email: e.target.value })
                    }
                    placeholder="[udhweid@gmail.com]"
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white font-mono text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={draftSettings.instagram}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, instagram: e.target.value })
                    }
                    placeholder="[@pacify_navratri]"
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-stone-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSaveContact}
                  className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Contact Details</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'venues' && (
            <div className="space-y-4">
              {/* Select Venue to Edit */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Select Venue to Edit (10+ Available)
                </label>
                <select
                  value={selectedVenueId}
                  onChange={(e) => handleVenueSelect(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                >
                  {venues.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.venueNumber} — {v.name} ({v.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Event / Festival Name
                  </label>
                  <input
                    type="text"
                    value={draftVenue.name}
                    onChange={(e) => setDraftVenue({ ...draftVenue, name: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Venue Ground Name
                  </label>
                  <input
                    type="text"
                    value={draftVenue.venueName}
                    onChange={(e) =>
                      setDraftVenue({ ...draftVenue, venueName: e.target.value })
                    }
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Date Range
                  </label>
                  <input
                    type="text"
                    value={draftVenue.date}
                    onChange={(e) => setDraftVenue({ ...draftVenue, date: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={draftVenue.startTime}
                    onChange={(e) =>
                      setDraftVenue({ ...draftVenue, startTime: e.target.value })
                    }
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={draftVenue.endTime}
                    onChange={(e) =>
                      setDraftVenue({ ...draftVenue, endTime: e.target.value })
                    }
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                  />
                </div>
              </div>

              {/* Pass Pricing */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-3">
                  Official Pass Pricing for {draftVenue.name}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(draftVenue.passOptions || []).map((pass, pIdx) => (
                    <div key={pass.id} className="p-3 bg-white rounded-xl border border-stone-200">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        {pass.name} (₹)
                      </label>
                      <input
                        type="number"
                        value={pass.price}
                        onChange={(e) => {
                          const newPrice = Math.max(0, parseInt(e.target.value) || 0);
                          const updatedOptions = [...(draftVenue.passOptions || [])];
                          updatedOptions[pIdx] = { ...pass, price: newPrice };
                          setDraftVenue({
                            ...draftVenue,
                            passOptions: updatedOptions,
                          });
                        }}
                        className="w-full p-2 text-xs font-mono font-bold rounded-lg border border-stone-200 bg-stone-50 text-stone-900"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Complete Address
                </label>
                <input
                  type="text"
                  value={draftVenue.fullAddress}
                  onChange={(e) =>
                    setDraftVenue({ ...draftVenue, fullAddress: e.target.value })
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Event Description
                </label>
                <textarea
                  rows={2}
                  value={draftVenue.description}
                  onChange={(e) =>
                    setDraftVenue({ ...draftVenue, description: e.target.value })
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSaveVenue}
                  className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Venue Details</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">
                  Placeholder vs Custom Pricing Mode
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  As requested, you can toggle between showing raw editable placeholders like{' '}
                  <code className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-800 font-mono">
                    ₹[PRICE]
                  </code>{' '}
                  everywhere or realistic placeholder figures like{' '}
                  <code className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-800 font-mono">
                    ₹[899] / ₹[1,499]
                  </code>
                  .
                </p>

                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftSettings.usePlaceholderPrices}
                      onChange={(e) => {
                        const updated = {
                          ...draftSettings,
                          usePlaceholderPrices: e.target.checked,
                        };
                        setDraftSettings(updated);
                        updateSettings({ usePlaceholderPrices: e.target.checked });
                      }}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-stone-800">
                      Force all cards and sections to display exact raw string: "₹[PRICE]"
                    </span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900">Export Venue Configuration</h4>
                  <p className="text-stone-500 mt-0.5">
                    Copy complete updated venues and pricing data as JSON
                  </p>
                </div>

                <button
                  onClick={copyConfigAsJson}
                  className="px-4 py-2 text-xs font-semibold bg-white border border-stone-200 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-stone-800"
                >
                  {copiedJson ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedJson ? 'Copied JSON' : 'Copy JSON'}</span>
                </button>
              </div>

              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-rose-900">Reset All Data to Factory Default</h4>
                  <p className="text-rose-700/80 mt-0.5">
                    Restores initial 12 venues, default pricing and placeholders.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all venue and contact settings to default?')) {
                      resetAllToDefault();
                      setIsEditorOpen(false);
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold text-rose-700 bg-white border border-rose-200 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Success Toast */}
        {saveToast && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Changes saved successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};
