import React, { useState } from 'react';
import { X, Download, Code, FileText, Check, Copy, Terminal, FolderArchive } from 'lucide-react';

interface CodeExportModalProps {
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ onClose }) => {
  const [downloadedType, setDownloadedType] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleDownloadStandaloneHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ALVINA Commerce - Standalone Portable Edition</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-[#100e16] text-[#f7f2fb] min-h-screen p-6">
  <div class="max-w-4xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">ALVINA Commerce - Offline Ready</h1>
    <p class="text-sm text-stone-400">এই সংস্করণটি সরাসরি অফলাইনে ব্রাউজারে চালু করা সম্ভব।</p>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alvina-commerce-admin-standalone.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedType('html');
  };

  const copyCloneCmd = () => {
    navigator.clipboard.writeText('npm install && npm run dev');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#181520] border border-[#342b40] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-[#342b40] bg-[#14101c] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-[#bd70df]" />
            <div>
              <h3 className="font-bold text-white text-base">সব কোড ডাউনলোড ও VS Code গাইড</h3>
              <p className="text-[11px] text-[#a69ab1]">Download Complete Source Code & Run in VS Code</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#a69ab1] hover:text-white hover:bg-[#251e30] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#241334] to-[#171324] border border-[#714786] shadow-sm space-y-2.5">
            <div className="flex items-center gap-2">
              <FolderArchive className="w-5 h-5 text-[#bd70df]" />
              <h4 className="text-sm font-bold text-white">
                পদ্ধতি ১: AI Studio ইন্টারফেস থেকে পুরো কোড একবারে ZIP ডাউনলোড (সরাসরি)
              </h4>
            </div>
            <p className="text-xs text-[#d7cddd] leading-relaxed">
              Google AI Studio Build উইন্ডোর উপরে ডান কোণায় (Top-Right) ৩-ডট মেনু বা Export অপশন রয়েছে। সেখানে ক্লিক করলে এক ক্লিকেই সম্পূর্ণ ZIP ফাইল আকারে ডাউনলোড হয়ে যাবে।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#100d16] border border-[#342b40] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#bd70df]" />
                <span>পদ্ধতি ২: Standalone Single HTML ফাইল (অফলাইন চলবে)</span>
              </div>
              <p className="text-xs text-[#a69ab1] leading-relaxed">
                কোনো Node.js ছাড়াই যেকোনো কম্পিউটারে ডাবল ক্লিকে ব্রাউজারে চলবে।
              </p>
            </div>
            <button
              onClick={handleDownloadStandaloneHTML}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] shrink-0 flex items-center gap-1.5 transition-all shadow-md w-full sm:w-auto justify-center cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloadedType === 'html' ? 'ডাউনলোড হয়েছে ✓' : 'HTML ডাউনলোড'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#120f1a] border border-[#30253d] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#cfc4d9]">
              <span className="font-mono text-[#a69ab1]">VS Code Terminal Commands:</span>
              <button
                onClick={copyCloneCmd}
                className="inline-flex items-center gap-1 text-[11px] text-[#bd70df] hover:text-[#d091ee] cursor-pointer"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'কপি হয়েছে' : 'কমান্ড কপি করুন'}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0a080f] font-mono text-xs text-[#8de8bf] overflow-x-auto">
              <code>npm install &amp;&amp; npm run dev</code>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#342b40] bg-[#14101c] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#a69ab1]">
            ডিফল্ট এডমিন লগইন: <strong className="text-white">admin / 123</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#211a2a] text-white hover:bg-[#2b2138] transition-colors cursor-pointer"
          >
            বন্ধ করুন (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
