import React, { useState } from 'react';
import { SystemConfig } from '../types';
import { Settings, KeyRound, Database, Download, Upload, Trash2, AlertTriangle, Check } from 'lucide-react';

interface SettingsViewProps {
  config: SystemConfig;
  onUpdateCredentials: (newUser: string, newPass: string) => boolean;
  onExportCSV: () => void;
  onClearAllData: () => void;
  onBackupJSON: () => void;
  onRestoreJSON: (file: File) => void;
  onOpenCodeExport?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  config,
  onUpdateCredentials,
  onExportCSV,
  onClearAllData,
  onBackupJSON,
  onRestoreJSON,
  onOpenCodeExport,
}) => {
  const [currentUser, setCurrentUser] = useState(config.user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUser, setNewUser] = useState(config.user);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser !== config.user || currentPassword !== config.password) {
      setStatusMsg({ type: 'error', text: 'বর্তমান User ID অথবা Password ভুল দেওয়া হয়েছে।' });
      return;
    }

    if (newPassword.length < 6) {
      setStatusMsg({ type: 'error', text: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: 'error', text: 'নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।' });
      return;
    }

    const ok = onUpdateCredentials(newUser.trim(), newPassword);
    if (ok) {
      setStatusMsg({
        type: 'success',
        text: 'লগইন তথ্য সফলভাবে পরিবর্তিত হয়েছে! আপনাকে আবার লগইন করতে হবে।',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleFileRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (confirm('এই ব্যাকআপ ফাইলটি রিস্টোর করলে বর্তমান ডেটা প্রতিস্থাপিত হবে। এগিয়ে যাবেন?')) {
      onRestoreJSON(file);
    }
    e.target.value = '';
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Admin Login Credentials */}
      <div className="p-6 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm space-y-5">
        <div className="pb-4 border-b border-[#342b40]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#bd70df]" />
            <span>অ্যাডমিন লগইন ক্রেডেনশিয়াল ও সিকিউরিটি</span>
          </h2>
          <p className="text-xs text-[#a69ab1]">
            প্রাথমিক ডিফল্ট লগইন: <b>admin</b> / <b>admin123</b>। নিরাপত্তার জন্য পাসওয়ার্ড পরিবর্তন করুন।
          </p>
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-medium border flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'bg-[#182a20] text-[#8de8bf] border-[#2b5942]'
                : 'bg-[#351822] text-[#ff9aaa] border-[#6b2a3a]'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <Check className="w-4 h-4 text-[#36c98b] shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#ff6b83] shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">বর্তমান User ID *</label>
              <input
                type="text"
                required
                value={currentUser}
                onChange={(e) => setCurrentUser(e.target.value)}
                className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
                বর্তমান Password *
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">নতুন User ID *</label>
              <input
                type="text"
                required
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
                নতুন Password (কমপক্ষে ৬ অক্ষর) *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
                নতুন Password কনফার্ম করুন *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] transition-colors"
            >
              লগইন তথ্য আপডেট করুন (Update Login)
            </button>
          </div>
        </form>
      </div>

      {/* Data Management & Backup */}
      <div className="p-6 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm space-y-5">
        <div className="pb-4 border-b border-[#342b40]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-[#bd70df]" />
            <span>ডাটা ব্যাকআপ ও এক্সপোর্ট (Backup & Restore)</span>
          </h2>
          <p className="text-xs text-[#a69ab1]">
            সকল মার্চেন্ট, অর্ডার ও প্রোডাক্টের ডাটা এই ব্রাউজারের লোকাল স্টোরেজে সুরক্ষিত থাকে।
          </p>
        </div>

        {/* VS Code & HTML Download Card */}
        {onOpenCodeExport && (
          <div className="p-4 rounded-xl bg-[#21162d] border border-[#714786] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white text-sm">
                VS Code ও Standalone HTML ফাইল ডাউনলোড
              </div>
              <p className="text-xs text-[#d7cddd] mt-0.5">
                সম্পূর্ণ সোর্স কোড ও অফলাইন সিঙ্গেল HTML ফাইল এক ক্লিকে ডাউনলোড করুন।
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenCodeExport}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] transition-colors shrink-0"
            >
              ডাউনলোড সেন্টার খুলুন
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#120f18] border border-[#342b40] space-y-2">
            <div className="font-semibold text-white text-sm">অর্ডার এক্সপোর্ট (CSV / Excel)</div>
            <p className="text-xs text-[#a69ab1]">
              সব কাস্টমার অর্ডার হিসাব-নিকাশের জন্য এক ক্লিকে CSV ডাউনলোড করুন।
            </p>
            <button
              onClick={onExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#271b35] hover:bg-[#bd70df] text-[#e8d9f0] hover:text-[#160e1b] border border-[#4c2d61] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Orders CSV</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#120f18] border border-[#342b40] space-y-2">
            <div className="font-semibold text-white text-sm">পূর্ণ ডাটা ব্যাকআপ (JSON)</div>
            <p className="text-xs text-[#a69ab1]">
              মার্চেন্ট, প্রোডাক্ট ও অর্ডারসহ সম্পূর্ণ সিস্টেম ব্যাকআপ ফাইল সংরক্ষণ করুন।
            </p>
            <button
              onClick={onBackupJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#271b35] hover:bg-[#bd70df] text-[#e8d9f0] hover:text-[#160e1b] border border-[#4c2d61] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Backup JSON</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#120f18] border border-[#342b40] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-white text-sm">ডাটা রিস্টোর (Restore from JSON)</div>
            <p className="text-xs text-[#a69ab1]">পূর্বের সেভ করা JSON ব্যাকআপ আপলোড করুন।</p>
          </div>
          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#211a2a] hover:bg-[#34203f] text-[#d7cddd] hover:text-white border border-[#40344c] cursor-pointer self-start sm:self-auto">
            <Upload className="w-4 h-4 text-[#bd70df]" />
            <span>রিস্টোর ফাইল বাছুন</span>
            <input type="file" accept=".json" onChange={handleFileRestore} className="hidden" />
          </label>
        </div>

        {/* Danger zone */}
        <div className="p-4 rounded-xl bg-[#28151c] border border-[#632938] space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-[#ff9aaa]">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone - ক্লিয়ার ডাটা</span>
          </div>
          <p className="text-xs text-[#ffb0bd]/80 leading-relaxed">
            সতর্কতা: "Clear All Business Data" চাপলে সমস্ত কাস্টমার অর্ডার, প্রোডাক্ট, মার্চেন্ট ও
            রেকর্ড চিরতরে মুছে যাবে।
          </p>
          <button
            onClick={() => {
              if (
                confirm(
                  'আপনি কি নিশ্চিত যে সমস্ত মার্চেন্ট, প্রোডাক্ট, অর্ডার ও ডাটা মুছে ফেলবেন? এই কাজটি ফিরিয়ে আনা যাবে না।'
                )
              ) {
                onClearAllData();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#491c28] hover:bg-[#ff6b83] text-[#ff9aaa] hover:text-[#180e12] border border-[#71283a] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Business Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
