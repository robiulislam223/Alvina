import React, { useState } from 'react';
import { Order, SystemConfig } from '../types';
import {
  X,
  Printer,
  Copy,
  Check,
  Receipt,
  Tag,
  FileText,
  Phone,
  MapPin,
  Truck,
  QrCode,
  Sparkles,
} from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  config: SystemConfig;
  onClose: () => void;
}

type PrintFormat = 'thermal' | 'sticker' | 'compact';

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, config, onClose }) => {
  const [format, setFormat] = useState<PrintFormat>('thermal');
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(order.date));

  const handleCopyMemoText = () => {
    const itemsText = order.items
      .map((i) => `• ${i.name} (x${i.qty})${i.size ? ` [সাইজ: ${i.size}]` : ''} - ৳${i.price * i.qty}`)
      .join('\n');

    const memoText =
      `🌸 ALVINA COMMERCE - কাস্টমার চালান #${order.id}\n` +
      `তারিখ: ${formattedDate}\n` +
      `------------------------------------\n` +
      `গ্রাহক: ${order.customer}\n` +
      `মোবাইল: ${order.phone}\n` +
      `ঠিকানা: ${order.address}\n` +
      `কুরিয়ার: ${order.courierService || 'Steadfast Courier'}\n` +
      `------------------------------------\n` +
      `আইটেমসমূহ:\n${itemsText}\n` +
      `------------------------------------\n` +
      `সাবটোটাল: ৳${order.subtotal}\n` +
      `ডেলিভারি চার্জ: ৳${order.charge}\n` +
      (order.discount ? `ডিসকাউন্ট: -৳${order.discount}\n` : '') +
      `সর্বমোট: ৳${order.total}\n` +
      (order.advance ? `অগ্রিম জমা: ৳${order.advance}\n` : '') +
      `ক্যাশ অন ডেলিভারি (বাকি COD): ৳${order.due}\n` +
      `------------------------------------\n` +
      `হটলাইন: ${config.whatsapp}`;

    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#15121c] border border-[#382d46] rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print p-3 sm:p-4 border-b border-[#342b40] bg-[#120f18] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#bd70df]/20 flex items-center justify-center text-[#bd70df]">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>ছোট প্রিন্ট রসিদ (Mini Slip)</span>
                <span className="text-[11px] font-mono text-[#bd70df]">#{order.id}</span>
              </div>
              <p className="text-[10px] text-[#a69ab1]">কাউন্টার বা পার্সেলের সাইজে প্রিন্ট করুন</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMemoText}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#211b2b] hover:bg-[#2e233d] text-[#e8d9f0] border border-[#3b2f4a] flex items-center gap-1.5 transition-colors"
              title="চালান টেক্সট কপি করুন"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#36c98b]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট করুন (Print)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#a69ab1] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Format Selector Tabs (Hidden in Print) */}
        <div className="no-print px-4 py-2 bg-[#191522] border-b border-[#342b40] flex items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setFormat('thermal')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              format === 'thermal'
                ? 'bg-[#bd70df] text-[#160e1b] shadow-sm'
                : 'bg-[#120f18] text-[#bcb1c7] hover:text-white border border-[#342b40]'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>৮০মিমি POS রসিদ (Thermal)</span>
          </button>

          <button
            onClick={() => setFormat('sticker')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              format === 'sticker'
                ? 'bg-[#bd70df] text-[#160e1b] shadow-sm'
                : 'bg-[#120f18] text-[#bcb1c7] hover:text-white border border-[#342b40]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>৪x৩" পার্সেল স্টিকার (Label)</span>
          </button>

          <button
            onClick={() => setFormat('compact')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              format === 'compact'
                ? 'bg-[#bd70df] text-[#160e1b] shadow-sm'
                : 'bg-[#120f18] text-[#bcb1c7] hover:text-white border border-[#342b40]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>এ৫ মিনি ইনভয়েস (Compact)</span>
          </button>
        </div>

        {/* Preview Area with Thermal Paper Mockup */}
        <div className="p-4 sm:p-6 bg-[#0d0b12] flex justify-center items-start overflow-y-auto max-h-[75vh]">
          {/* FORMAT 1: 80mm THERMAL RECEIPT SLIP */}
          {format === 'thermal' && (
            <div
              id="printable-memo"
              className="printable-slip-container w-full max-w-[320px] bg-white text-black p-4 rounded-lg shadow-xl font-mono text-[11px] leading-tight select-none border border-dashed border-gray-300 print:border-none print:shadow-none"
            >
              {/* Header */}
              <div className="text-center pb-2 border-b border-dashed border-black">
                <div className="text-base font-extrabold tracking-tight font-sans">
                  ALVINA COMMERCE
                </div>
                <div className="text-[10px] text-gray-700 font-sans">
                  Exclusive Boutique & Women's Wear
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5">
                  হটলাইন: {config.whatsapp}
                </div>
                <div className="text-[9px] text-gray-500">
                  {config.storeAddress || 'Dhaka, Bangladesh'}
                </div>
              </div>

              {/* Order Meta */}
              <div className="py-2 border-b border-dashed border-black text-[10px] space-y-0.5">
                <div className="flex justify-between font-bold text-xs">
                  <span>MEMO: #{order.id}</span>
                  <span className="text-[10px] font-normal">{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>উৎস: {order.source}</span>
                  <span>কুরিয়ার: {order.courierService || 'Steadfast'}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="py-2 border-b border-dashed border-black text-[10.5px]">
                <div className="font-bold text-[11px]">প্রাপক: {order.customer}</div>
                <div className="font-bold text-xs tracking-wider">মোবাইল: {order.phone}</div>
                <div className="text-gray-800 mt-0.5 leading-snug">ঠিকানা: {order.address}</div>
                {order.shippingNote && (
                  <div className="mt-1 p-1 bg-gray-100 border border-gray-300 text-[10px] font-sans">
                    নোট: {order.shippingNote}
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="py-2 border-b border-dashed border-black">
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="border-b border-black text-[10px] font-bold">
                      <th className="pb-1">আইটেম (সাইজ)</th>
                      <th className="pb-1 text-center">পরি.</th>
                      <th className="pb-1 text-right">মূল্য</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-1 pr-1">
                          <div className="font-semibold">{item.name}</div>
                          {item.size && (
                            <span className="text-[9.5px] font-sans font-bold bg-gray-200 px-1 rounded">
                              সাইজ: {item.size}
                            </span>
                          )}
                        </td>
                        <td className="py-1 text-center font-bold">x{item.qty}</td>
                        <td className="py-1 text-right tabular-nums">৳{item.price * item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation */}
              <div className="py-2 border-b border-dashed border-black space-y-1 text-[10.5px]">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span className="tabular-nums">৳{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="tabular-nums">+৳{order.charge}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-red-600 font-medium">
                    <span>ডিসকাউন্ট:</span>
                    <span className="tabular-nums">-৳{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                  <span>মোট বিল:</span>
                  <span className="tabular-nums">৳{order.total}</span>
                </div>
                {order.advance > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>অগ্রিম পেমেন্ট:</span>
                    <span className="tabular-nums">-৳{order.advance}</span>
                  </div>
                )}
              </div>

              {/* HIGH PRIORITY COD HIGHLIGHT BOX */}
              <div className="my-2.5 p-2 bg-gray-100 border-2 border-black rounded text-center print-highlight-box">
                <div className="text-[10px] uppercase font-bold tracking-wider">
                  ক্যাশ অন ডেলিভারি (Due COD)
                </div>
                <div className="text-xl font-black tabular-nums tracking-tight">
                  ৳{order.due}
                </div>
                <div className="text-[9px] text-gray-600">
                  {order.due === 0 ? 'সম্পূর্ণ পরিশোধিত (Paid)' : 'ডেলিভারির সময় এই টাকা সংগ্রহ করুন'}
                </div>
              </div>

              {/* Barcode & Footer */}
              <div className="pt-2 text-center text-[9px] text-gray-600 space-y-1">
                {/* Barcode graphic */}
                <div className="flex justify-center items-center py-1 font-mono tracking-widest text-xs font-bold">
                  ||| | |||| | ||| || ||| |||| |
                </div>
                <div className="font-mono text-[9px]">*{order.id}*</div>
                <p className="font-sans leading-tight">
                  পার্সেলটি রাইডারের সামনে খুলে চেক করুন। কোনো প্রয়োজনে হটলাইনে কল দিন।
                </p>
                <div className="font-bold text-black font-sans">
                  ধন্যবাদ, সাথে থাকার জন্য! 🌸
                </div>
              </div>
            </div>
          )}

          {/* FORMAT 2: 4x3" COURIER SHIPPING STICKER LABEL */}
          {format === 'sticker' && (
            <div
              id="printable-memo"
              className="printable-slip-container w-full max-w-[340px] bg-white text-black p-3.5 rounded-lg shadow-xl font-sans text-xs select-none border-2 border-black print:border-2"
            >
              {/* Sticker Top Header */}
              <div className="flex justify-between items-center pb-2 border-b-2 border-black">
                <div>
                  <div className="font-black text-sm tracking-tight">
                    ALVINA COMMERCE
                  </div>
                  <div className="text-[10px] font-bold text-gray-700">
                    {order.courierService || 'Steadfast Courier'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-1.5 py-0.5 bg-black text-white font-mono font-bold text-[10px] rounded">
                    #{order.id}
                  </div>
                  <div className="text-[9px] text-gray-500 font-mono mt-0.5">{formattedDate}</div>
                </div>
              </div>

              {/* To / Recipient Details - Big Bold */}
              <div className="py-2.5 border-b-2 border-black space-y-1">
                <div className="text-[10px] uppercase font-bold text-gray-600">
                  প্রাপক (Customer / Recipient):
                </div>
                <div className="font-black text-sm text-black leading-tight">
                  {order.customer}
                </div>
                <div className="font-mono font-black text-base tracking-wide bg-gray-100 px-1.5 py-0.5 inline-block rounded border border-gray-400">
                  📞 {order.phone}
                </div>
                <div className="text-xs font-medium text-gray-900 leading-snug pt-0.5">
                  <span className="font-bold">ঠিকানা:</span> {order.address}
                </div>
                {order.shippingNote && (
                  <div className="text-[10px] font-bold text-red-700 bg-red-50 p-1 rounded border border-red-200">
                    ডেলিভারি নির্দেশ: {order.shippingNote}
                  </div>
                )}
              </div>

              {/* Giant COD Amount Box */}
              <div className="my-2 p-2 bg-yellow-50 border-2 border-black rounded text-center print-highlight-box">
                <div className="text-[10px] font-bold uppercase tracking-wider text-black">
                  ক্যাশ অন ডেলিভারি (Cash Collection)
                </div>
                <div className="text-2xl font-black tabular-nums text-black leading-none mt-0.5">
                  ৳ {order.due}
                </div>
                <div className="text-[9px] font-semibold text-gray-700 mt-0.5">
                  {order.due === 0 ? 'পেইড পার্সেল (Do Not Collect)' : 'রাইডার অনুগ্রহ করে টাকা সংগ্রহ করুন'}
                </div>
              </div>

              {/* Package Content & Sizes */}
              <div className="py-1.5 border-b border-gray-300 text-[10.5px]">
                <div className="font-bold text-[10px] text-gray-600">প্যাকেজের পণ্য:</div>
                <div className="space-y-0.5">
                  {order.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="font-medium truncate max-w-[200px]">
                        {i.name} {i.size ? `(সাইজ: ${i.size})` : ''}
                      </span>
                      <span className="font-bold font-mono">x{i.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* From / Shipper Return Address */}
              <div className="pt-2 text-[9px] text-gray-600 flex justify-between items-end">
                <div>
                  <div className="font-bold text-black text-[10px]">
                    প্রেরক: ALVINA Commerce
                  </div>
                  <div>হটলাইন: {config.whatsapp}</div>
                  <div>{config.storeAddress || 'Dhaka, Bangladesh'}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] font-bold">||||||||||||||||</div>
                  <div className="text-[8px] text-gray-500 font-mono">TRACK: {order.id}</div>
                </div>
              </div>
            </div>
          )}

          {/* FORMAT 3: COMPACT A5 BOUTIQUE MEMO */}
          {format === 'compact' && (
            <div
              id="printable-memo"
              className="printable-slip-container w-full max-w-[360px] bg-white text-black p-4 rounded-lg shadow-xl font-sans text-xs select-none border border-gray-300"
            >
              <div className="flex justify-between items-start pb-2 border-b border-gray-300">
                <div>
                  <div className="text-lg font-bold tracking-tight text-purple-900">
                    ALVINA COMMERCE
                  </div>
                  <div className="text-[10px] text-gray-500">Boutique & Fashion House</div>
                  <div className="text-[10px] text-gray-600">হটলাইন: {config.whatsapp}</div>
                </div>
                <div className="text-right">
                  <div className="px-2 py-0.5 bg-purple-100 text-purple-900 rounded font-bold text-[10px]">
                    ইনভয়েস চালান
                  </div>
                  <div className="font-mono font-bold text-sm mt-0.5">#{order.id}</div>
                  <div className="text-[9px] text-gray-500">{formattedDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 text-[10px] border-b border-gray-200">
                <div>
                  <span className="text-gray-500 block font-semibold">গ্রাহকের তথ্য:</span>
                  <div className="font-bold text-black">{order.customer}</div>
                  <div className="font-mono">{order.phone}</div>
                  <div className="text-gray-600 text-[9px] truncate">{order.address}</div>
                </div>
                <div>
                  <span className="text-gray-500 block font-semibold">ডেলিভারি বিবরণ:</span>
                  <div>কুরিয়ার: <span className="font-bold">{order.courierService || 'Steadfast'}</span></div>
                  <div>পেমেন্ট: {order.paymentMethod}</div>
                  <div>উৎস: {order.source}</div>
                </div>
              </div>

              <div className="py-2 border-b border-gray-200">
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="border-b border-gray-300 text-[10px] text-gray-500">
                      <th className="pb-1">প্রোডাক্ট</th>
                      <th className="pb-1 text-center">পরিমাণ</th>
                      <th className="pb-1 text-right">মোট</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-1">
                          <div className="font-medium">{it.name}</div>
                          {it.size && <div className="text-[9px] text-gray-500">সাইজ: {it.size}</div>}
                        </td>
                        <td className="py-1 text-center font-bold">x{it.qty}</td>
                        <td className="py-1 text-right font-mono tabular-nums">৳{it.price * it.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="py-2 space-y-0.5 text-[10px] text-right">
                <div className="flex justify-between text-gray-600">
                  <span>সাবটোটাল:</span>
                  <span className="font-mono">৳{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ডেলিভারি:</span>
                  <span className="font-mono">+৳{order.charge}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>ছাড়:</span>
                    <span className="font-mono">-৳{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-xs pt-1 border-t border-gray-200">
                  <span>মোট বিল:</span>
                  <span className="font-mono text-purple-900">৳{order.total}</span>
                </div>
                {order.advance > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>অগ্রিম প্রদান:</span>
                    <span className="font-mono">৳{order.advance}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm bg-purple-50 p-1.5 rounded mt-1 border border-purple-200 text-black">
                  <span>ক্যাশ অন ডেলিভারি (Due):</span>
                  <span className="font-mono text-purple-950 font-black">৳{order.due}</span>
                </div>
              </div>

              <div className="pt-2 text-center text-[9px] text-gray-500 border-t border-gray-200">
                পার্সেলটি রাইডারের সামনে খুলে চেক করুন। ধন্যবাদ!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
