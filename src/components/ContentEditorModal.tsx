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
  Lock,
  ShieldCheck,
  LogOut,
  KeyRound,
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
    isOwnerAuthenticated,
    loginAsOwner,
    logoutOwner,
    changeAdminPin,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'contact' | 'venues' | 'prices' | 'security'>('venues');
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || '');
  const [saveToast, setSaveToast] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // PIN login state
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // PIN change state
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ text: string; error: boolean } | null>(null);

  // Local draft of settings
  const [draftSettings, setDraftSettings] = useState(settings);

  // Local draft of selected venue
  const selectedVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];
  const [draftVenue, setDraftVenue] = useState<VenueEvent>(selectedVenue);

  if (!isEditorOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError('Please enter your owner PIN');
      return;
    }
    const success = loginAsOwner(pinInput);
    if (success) {
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Incorrect Owner PIN. Access is restricted to the website owner.');
    }
  };

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

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput || newPinInput.trim().length < 4) {
      setPinChangeMsg({ text: 'PIN must be at least 4 digits.', error: true });
      return;
    }
    const ok = changeAdminPin(newPinInput.trim());
    if (ok) {
      setPinChangeMsg({ text: 'Owner PIN updated successfully!', error: false });
      setNewPinInput('');
      setTimeout(() => setPinChangeMsg(null), 3000);
    } else {
      setPinChangeMsg({ text: 'Failed to update PIN.', error: true });
    }
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

  // If owner is NOT authenticated, show the PIN Gate
  if (!isOwnerAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden p-6 sm:p-8">
          <button
            onClick={() => setIsEditorOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="font-display text-xl font-bold text-stone-900">
              Owner Access Portal
            </h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed max-w-xs mx-auto">
              Price changes and venue configurations are restricted exclusively to the verified website owner.
            </p>

            <form onSubmit={handlePinSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Enter Owner PIN (e.g. 7359)"
                  maxLength={12}
                  className="w-full px-4 py-3 text-center text-lg tracking-widest font-mono border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-600 mt-2 font-medium bg-rose-50 p-2 rounded-lg border border-rose-200">
                    {pinError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Unlock Portal</span>
              </button>
            </form>

            <div className="mt-5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] text-stone-500 text-left">
              <p><strong>Note for Owner:</strong> Default PIN is <span className="font-mono font-bold text-amber-900">7359</span> (last 4 digits of your registered phone). You can change it inside once logged in.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Owner Status */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base font-bold text-stone-900">
                  Owner Portal & Price Manager
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Verified Owner
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Only you have permission to modify pass prices and site details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logoutOwner}
              title="Log out of Owner Mode"
              className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
            <button
              onClick={() => setIsEditorOpen(false)}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 pt-3 border-b border-stone-200 bg-stone-50/50 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('venues')}
            className={`pb-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'venues'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Venue Details & Prices
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Contact & Social Info
          </button>
          <button
            onClick={() => setActiveTab('prices')}
            className={`pb-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'prices'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Pricing Display Format
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>Owner PIN & Deploy</span>
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
                    Restores initial venues, default pricing and placeholders.
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

          {/* Tab 4: Owner Security & Deployment */}
          {activeTab === 'security' && (
            <div className="space-y-6 text-xs">
              {/* Active Session Info */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Authenticated as Website Owner</h4>
                    <p className="text-emerald-800 font-medium mt-0.5">
                      Session Active · Only you can view this portal
                    </p>
                  </div>
                </div>

                <button
                  onClick={logoutOwner}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5 text-stone-500" />
                  <span>Log Out</span>
                </button>
              </div>

              {/* Change Owner PIN */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <KeyRound className="w-4 h-4 text-amber-700" />
                  <h4>Change Owner PIN</h4>
                </div>
                <p className="text-stone-500">
                  Update the secret PIN used to unlock this Owner Portal.
                </p>

                <form onSubmit={handleChangePin} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <input
                    type="password"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Enter new 4+ digit PIN"
                    maxLength={12}
                    className="w-full sm:w-64 px-3 py-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Update PIN
                  </button>
                </form>

                {pinChangeMsg && (
                  <p
                    className={`mt-2 font-medium ${
                      pinChangeMsg.error ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {pinChangeMsg.text}
                  </p>
                )}
              </div>

              {/* Permanent Code Export for Vercel */}
              <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                  <Building className="w-4 h-4 text-amber-800" />
                  <h4>Deploy Permanent Prices to Vercel</h4>
                </div>
                <p className="text-amber-900/80 leading-relaxed">
                  Prices edited in this portal take effect instantly in your browser session. To permanently update prices for every single customer visiting on Vercel, copy the updated configuration and commit it to GitHub.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={copyConfigAsJson}
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    {copiedJson ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>{copiedJson ? 'Config Copied!' : 'Copy Updated Config JSON'}</span>
                  </button>
                </div>
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
