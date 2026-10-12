import React from 'react';
import { Order, SystemConfig } from '../types';
import { X, Printer, Phone, MapPin } from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  config: SystemConfig;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, config, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#181520] border border-[#342b40] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Controls (Hidden in Print) */}
        <div className="no-print flex items-center justify-between p-4 border-b border-[#342b40] bg-[#14101c]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#bd70df]">চালান / ইনভয়েস রসিদ</span>
            <span className="text-xs text-[#a69ab1]">#{order.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট করুন (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#a69ab1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div
          id="printable-memo"
          className="p-6 sm:p-8 bg-[#181520] text-white print:bg-white print:text-black print:p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-[#342b40] print:border-gray-300 pb-6 mb-6">
            <div>
              <div className="text-2xl font-bold tracking-tight font-['Plus_Jakarta_Sans'] text-white print:text-black">
                ALVINA <span className="text-[#bd70df] print:text-purple-700">COMMERCE</span>
              </div>
              <p className="text-xs text-[#a69ab1] print:text-gray-600 font-medium">
                Exclusive Women's Wear & Boutique
              </p>
              <div className="text-xs text-[#a69ab1] print:text-gray-600 mt-2 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#bd70df] print:text-purple-700 shrink-0" />
                  <span>হটলাইন: {config.whatsapp}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#bd70df] print:text-purple-700 shrink-0" />
                  <span>{config.storeAddress || 'Dhaka, Bangladesh'}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded bg-[#2b1f36] print:bg-gray-100 text-[#bd70df] print:text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
                Order Memo / চালান
              </div>
              <div className="text-base font-bold text-white print:text-black tabular-nums">
                #{order.id}
              </div>
              <div className="text-xs text-[#a69ab1] print:text-gray-600">{formattedDate}</div>
              <div className="text-xs font-medium text-[#36c98b] print:text-green-700 mt-1">
                Status: {order.status}
              </div>
            </div>
          </div>

          {/* Customer & Courier Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#120f18] print:bg-gray-50 border border-[#342b40] print:border-gray-200 mb-6 text-xs">
            <div>
              <span className="font-semibold text-[#bd70df] print:text-purple-700 block mb-1">
                কাস্টমারের বিবরণ (Customer):
              </span>
              <div className="font-bold text-white print:text-black text-sm">{order.customer}</div>
              <div className="text-[#d7cddd] print:text-gray-800 font-mono mt-0.5">
                ফোন: {order.phone}
              </div>
              <div className="text-[#a69ab1] print:text-gray-600 mt-1 leading-relaxed">
                ঠিকানা: {order.address}
              </div>
              {order.shippingNote && (
                <div className="mt-2 text-[11px] text-[#ffb0bd] print:text-red-700 bg-[#321721] print:bg-red-50 p-1.5 rounded">
                  নির্দেশনা: {order.shippingNote}
                </div>
              )}
            </div>

            <div>
              <span className="font-semibold text-[#bd70df] print:text-purple-700 block mb-1">
                ডেলিভারি ও পেমেন্ট (Delivery):
              </span>
              <div className="text-[#d7cddd] print:text-gray-800 space-y-1">
                <div>
                  মেথড: <span className="font-semibold text-white print:text-black">{order.deliveryMethod}</span>
                </div>
                <div>
                  কুরিয়ার:{' '}
                  <span className="font-semibold text-white print:text-black">
                    {order.courierService || 'Standard Courier'}
                  </span>
                </div>
                <div>
                  পেমেন্ট মাধ্যম:{' '}
                  <span className="font-semibold text-white print:text-black">{order.paymentMethod}</span>
                </div>
                <div>
                  অর্ডারের উৎস:{' '}
                  <span className="font-semibold text-white print:text-black">{order.source}</span>
                </div>
                {order.dressSize && (
                  <div>
                    ড্রেস সাইজ:{' '}
                    <span className="font-bold text-[#bd70df] print:text-purple-700">
                      {order.dressSize}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#342b40] print:border-gray-300 text-[#a69ab1] print:text-gray-600">
                  <th className="py-2.5 px-2 font-semibold">প্রোডাক্ট বিবরণ</th>
                  <th className="py-2.5 px-2 font-semibold text-center">পরিমাণ</th>
                  <th className="py-2.5 px-2 font-semibold text-right">একক মূল্য</th>
                  <th className="py-2.5 px-2 font-semibold text-right">মোট (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282033] print:divide-gray-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="text-[#eee5f3] print:text-gray-900">
                    <td className="py-3 px-2">
                      <div className="font-medium text-white print:text-black">{item.name}</div>
                      {item.size && (
                        <span className="text-[11px] text-[#a69ab1] print:text-gray-500">
                          সাইজ: {item.size}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center font-mono tabular-nums">{item.qty}</td>
                    <td className="py-3 px-2 text-right font-mono tabular-nums">৳{item.price}</td>
                    <td className="py-3 px-2 text-right font-mono font-semibold tabular-nums">
                      ৳{item.price * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-6">
            <div className="w-64 space-y-2 text-xs border-t border-[#342b40] print:border-gray-300 pt-3">
              <div className="flex justify-between text-[#a69ab1] print:text-gray-600">
                <span>সাবটোটাল (Subtotal):</span>
                <span className="font-mono tabular-nums text-white print:text-black">
                  ৳{order.subtotal}
                </span>
              </div>
              <div className="flex justify-between text-[#a69ab1] print:text-gray-600">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-mono tabular-nums text-white print:text-black">
                  + ৳{order.charge}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#ff9aaa] print:text-red-700">
                  <span>ডিসকাউন্ট:</span>
                  <span className="font-mono tabular-nums">- ৳{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white print:text-black pt-2 border-t border-[#342b40] print:border-gray-200">
                <span>সর্বমোট (Grand Total):</span>
                <span className="font-mono tabular-nums text-[#bd70df] print:text-purple-700">
                  ৳{order.total}
                </span>
              </div>
              {order.advance > 0 && (
                <div className="flex justify-between text-[#36c98b] print:text-green-700">
                  <span>অগ্রিম প্রদান (Advance):</span>
                  <span className="font-mono tabular-nums">৳{order.advance}</span>
                </div>
              )}
              <div className="flex justify-between p-2 rounded-lg bg-[#2b172a] print:bg-purple-50 text-white print:text-black font-bold text-sm border border-[#bd70df]/30 print:border-purple-200">
                <span>ক্যাশ অন ডেলিভারি (Due COD):</span>
                <span className="font-mono tabular-nums text-[#ff9aaa] print:text-red-600 text-base">
                  ৳{order.due}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="border-t border-[#342b40] print:border-gray-300 pt-4 text-[11px] text-[#a69ab1] print:text-gray-600 leading-relaxed text-center">
            <p>
              অনুগ্রহ করে ডেলিভারি পার্সেলটি রাইডারের সামনে খুলে চেক করুন। কোনো সাইজ সমস্যা বা ডিফেক্ট
              থাকলে সাথে সাথে আমাদের হেল্পলাইনে ({config.whatsapp}) যোগাযোগ করুন।
            </p>
            <p className="mt-1 font-semibold text-white print:text-gray-800">
              ALVINA Commerce - আপনার পছন্দের ফ্যাশন পার্টনার
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
