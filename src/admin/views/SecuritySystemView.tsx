import React, { useState } from 'react';
import { AuditLogEntry, ApiWebhook, Language } from '../types';
import { Shield, Download, Upload, RefreshCw, CheckCircle2, AlertTriangle, Key } from 'lucide-react';

interface SecuritySystemViewProps {
  logs: AuditLogEntry[];
  webhooks: ApiWebhook[];
  lang: Language;
  onOpenCodeExport: () => void;
}

export const SecuritySystemView: React.FC<SecuritySystemViewProps> = ({
  logs,
  webhooks,
  lang,
  onOpenCodeExport,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadBackup = () => {
    try {
      const backupData: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('alvina_') || key.startsWith('commerce_'))) {
          backupData[key] = localStorage.getItem(key);
        }
      }
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `alvina_commerce_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#bd70df]" />
            <span>সিস্টেম অডিট লগ ও ডাটাবেজ ব্যাকআপ</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            এডমিনের কার্যক্রম নিরীক্ষণ এবং সম্পূর্ণ ওয়েবসাইট ও অর্ডারের ডাটা ব্যাকআপ ডাউনলোড।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadBackup}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>JSON ডাটাবেজ ব্যাকআপ নিন</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>ডাটাবেজ ফাইলটি সফলভাবে আপনার ডিভাইসে ডাউনলোড হয়েছে!</span>
        </div>
      )}

      {/* Audit Log Table */}
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#2d2538]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            অডিট ট্রেইল ও সিকিউরিটি লগ
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14111c] text-[#8e829d] border-b border-[#2d2538]">
              <tr>
                <th className="py-2.5 px-4">সময়</th>
                <th className="py-2.5 px-4">ইউজার / অ্যাক্টর</th>
                <th className="py-2.5 px-4">টার্গেট</th>
                <th className="py-2.5 px-4">অ্যাকশন</th>
                <th className="py-2.5 px-4">বিবরণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2538]/50">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-4 text-[#8e829d]">{l.timestamp}</td>
                  <td className="py-2.5 px-4 font-bold text-white">{l.actor}</td>
                  <td className="py-2.5 px-4 text-[#a69ab1]">{l.target}</td>
                  <td className="py-2.5 px-4 text-[#bd70df] font-semibold">{l.action}</td>
                  <td className="py-2.5 px-4 text-[#d6cce0]">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
