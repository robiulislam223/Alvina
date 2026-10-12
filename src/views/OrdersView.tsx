import React, { useState } from 'react';
import { Order, OrderStatus, SystemConfig } from '../types';
import {
  Search,
  Plus,
  Printer,
  MessageSquare,
  Edit2,
  Trash2,
  Filter,
  Truck,
  CheckSquare,
  Square,
  ArrowUpDown,
  Phone,
} from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  config: SystemConfig;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: number) => void;
  onUpdateStatus: (orderId: number, status: OrderStatus) => void;
  onOpenInvoice: (order: Order) => void;
  onNewOrder: () => void;
  onOpenBulkCourier: (orders: Order[]) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  config,
  onEditOrder,
  onDeleteOrder,
  onUpdateStatus,
  onOpenInvoice,
  onNewOrder,
  onOpenBulkCourier,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const statuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Returned',
  ];

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      String(o.id).includes(searchTerm) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm) ||
      (o.address && o.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      o.items.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map((o) => o.id));
    }
  };

  const handleBulkStatusChange = (newStatus: OrderStatus) => {
    if (selectedIds.length === 0) return;
    if (confirm(`নির্বাচিত ${selectedIds.length} টি অর্ডারের স্ট্যাটাস "${newStatus}" করবেন?`)) {
      selectedIds.forEach((id) => onUpdateStatus(id, newStatus));
      setSelectedIds([]);
    }
  };

  const openWhatsApp = (order: Order) => {
    const items = order.items.map((p) => `${p.name} (x${p.qty})`).join(', ');
    const msg =
      `🌸 ALVINA Women Wear\n` +
      `আসসালামু আলাইকুম ${order.customer} আপু,\n` +
      `আপনার অর্ডার নিশ্চিত করা হয়েছে।\n\n` +
      `📦 Order ID: #${order.id}\n` +
      `👗 আইটেম: ${items}\n` +
      `💵 সর্বমোট: ৳${order.total}\n` +
      `💰 অগ্রিম: ৳${order.advance}\n` +
      `🚚 ক্যাশ অন ডেলিভারি (Due COD): ৳${order.due}\n` +
      `📍 ডেলিভারি ঠিকানা: ${order.address}\n` +
      `🚚 কুরিয়ার: ${order.courierService || 'Steadfast / Pathao'}\n\n` +
      `প্রয়োজনে যোগাযোগ: ${config.whatsapp}\n` +
      `ধন্যবাদ!`;

    const cleanPhone = order.phone.replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('880')
      ? cleanPhone
      : cleanPhone.startsWith('0')
      ? '88' + cleanPhone
      : '880' + cleanPhone;

    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const selectedOrdersList = orders.filter((o) => selectedIds.includes(o.id));

  return (
    <div className="space-y-5">
      {/* Search and Filters Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-[#a69ab1] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Order ID / কাস্টমার / ফোন নম্বর / এলাকা খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-[#100d16] border border-[#342b40] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onNewOrder}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন অর্ডার তৈরি</span>
            </button>

            {selectedIds.length > 0 && (
              <button
                onClick={() => onOpenBulkCourier(selectedOrdersList)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#2a1d35] text-[#e6b4fa] border border-[#714786] hover:bg-[#392449] transition-colors"
              >
                <Truck className="w-4 h-4" />
                <span>কুরিয়ার বাল্ক ডাটা ({selectedIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              statusFilter === 'All'
                ? 'bg-[#bd70df] text-[#160e1b] font-bold'
                : 'bg-[#100d16] text-[#bcb1c7] hover:text-white border border-[#342b40]'
            }`}
          >
            All Orders ({orders.length})
          </button>
          {statuses.map((st) => {
            const count = orders.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-[#bd70df] text-[#160e1b] font-bold'
                    : 'bg-[#100d16] text-[#bcb1c7] hover:text-white border border-[#342b40]'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>

        {/* Selected Items Bulk Bar */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 rounded-xl bg-[#2b1f36] border border-[#523363] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#f7dcff] font-medium">
              {selectedIds.length} টি অর্ডার সিলেক্ট করা হয়েছে
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#a69ab1]">স্ট্যাটাস বদলান:</span>
              {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => handleBulkStatusChange(st as OrderStatus)}
                  className="px-2.5 py-1 rounded-md bg-[#181520] hover:bg-[#392449] text-white border border-[#523363]"
                >
                  {st}
                </button>
              ))}
              <button
                onClick={() => setSelectedIds([])}
                className="px-2 py-1 rounded-md text-[#ff9aaa] hover:underline"
              >
                বাতিল
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#14101c] border-b border-[#342b40] text-[#a69ab1]">
                <th className="py-3 px-3 w-8">
                  <button onClick={selectAll} className="text-[#a69ab1] hover:text-white">
                    {selectedIds.length > 0 && selectedIds.length === filteredOrders.length ? (
                      <CheckSquare className="w-4 h-4 text-[#bd70df]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3 font-semibold">Order ID / Date</th>
                <th className="py-3 px-3 font-semibold">কাস্টমার ও ঠিকানা</th>
                <th className="py-3 px-3 font-semibold">আইটেম ও সাইজ</th>
                <th className="py-3 px-3 font-semibold">টাকা ও পেমেন্ট (৳)</th>
                <th className="py-3 px-3 font-semibold">স্ট্যাটাস</th>
                <th className="py-3 px-3 font-semibold text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282033]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#a69ab1]">
                    কোনো অর্ডার পাওয়া যায়নি। "নতুন অর্ডার তৈরি" চাপুন।
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const isSelected = selectedIds.includes(o.id);
                  const dateStr = new Date(o.date).toLocaleDateString('bn-BD', {
                    day: 'numeric',
                    month: 'short',
                  });

                  return (
                    <tr
                      key={o.id}
                      className={`hover:bg-[#201927] transition-colors ${
                        isSelected ? 'bg-[#291e32]' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <button
                          onClick={() => toggleSelect(o.id)}
                          className="text-[#a69ab1] hover:text-white"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#bd70df]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Order ID & Date */}
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-white text-sm">#{o.id}</div>
                        <div className="text-[11px] text-[#a69ab1] mt-0.5">{dateStr}</div>
                        <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-[#281b37] text-[#bd70df] font-medium">
                          {o.source}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3 px-3 max-w-xs">
                        <div className="font-semibold text-white">{o.customer}</div>
                        <div className="font-mono text-[#e4d8ec] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#bd70df]" />
                          <span>{o.phone}</span>
                        </div>
                        <div className="text-[11px] text-[#a69ab1] truncate mt-0.5" title={o.address}>
                          {o.address}
                        </div>
                        {o.shippingNote && (
                          <div className="text-[10px] text-[#ffb0bd] bg-[#331821] px-1.5 py-0.5 rounded mt-1 truncate">
                            নোট: {o.shippingNote}
                          </div>
                        )}
                      </td>

                      {/* Items */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="text-[#d7cddd] leading-tight">
                              <span className="font-medium text-white">{item.name}</span>
                              <span className="text-[#a69ab1] ml-1">
                                (x{item.qty} {item.size ? `· ${item.size}` : ''})
                              </span>
                            </div>
                          ))}
                        </div>
                        {o.dressSize && !o.items.some((i) => i.size) && (
                          <div className="text-[10px] text-[#bd70df] font-semibold mt-1">
                            সাইজ: {o.dressSize}
                          </div>
                        )}
                      </td>

                      {/* Amount Details */}
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-base text-[#bd70df] tabular-nums">
                          ৳{o.total}
                        </div>
                        <div className="text-[11px] text-[#a69ab1] space-x-1 tabular-nums">
                          <span>ডেলিভারি: ৳{o.charge}</span>
                          {o.advance > 0 && <span>· অগ্রিম: ৳{o.advance}</span>}
                        </div>
                        <div className="text-[11px] font-semibold text-[#ff9aaa] mt-0.5 tabular-nums">
                          ক্যাশ COD: ৳{o.due}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-3">
                        <select
                          value={o.status}
                          onChange={(e) => onUpdateStatus(o.id, e.target.value as OrderStatus)}
                          className={`text-xs px-2.5 py-1.5 rounded-full border outline-none font-medium cursor-pointer ${
                            o.status === 'Delivered'
                              ? 'bg-[#16382d] text-[#8de8bf] border-[#255845]'
                              : o.status === 'Cancelled'
                              ? 'bg-[#44202a] text-[#ff9aaa] border-[#6b2a3a]'
                              : o.status === 'Shipped'
                              ? 'bg-[#1c2e4a] text-[#93c5fd] border-[#2b4c7e]'
                              : 'bg-[#34213d] text-[#e3b7f3] border-[#553265]'
                          }`}
                        >
                          {statuses.map((st) => (
                            <option key={st} value={st} className="bg-[#181520] text-white">
                              {st}
                            </option>
                          ))}
                        </select>
                        <div className="text-[10px] text-[#a69ab1] mt-1">
                          {o.courierService || 'Standard'}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => onOpenInvoice(o)}
                            title="ছোট সাইজের রসিদ / পার্সেল স্টিকার প্রিন্ট করুন (Mini Print)"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-[#e6b4fa] bg-[#271a36] hover:bg-[#3d2454] border border-[#5d3077] transition-all active:scale-95 shadow-sm"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#bd70df]" />
                            <span className="hidden sm:inline">ছোট প্রিন্ট</span>
                          </button>

                          <button
                            onClick={() => openWhatsApp(o)}
                            title="WhatsApp মেসেজ পাঠান"
                            className="p-1.5 rounded-lg text-[#a69ab1] hover:text-[#36c98b] hover:bg-[#1b2b23] transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onEditOrder(o)}
                            title="অর্ডার এডিট করুন"
                            className="p-1.5 rounded-lg text-[#a69ab1] hover:text-[#60a5fa] hover:bg-[#1a263d] transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Order #${o.id} মুছে ফেলবেন?`)) {
                                onDeleteOrder(o.id);
                              }
                            }}
                            title="অর্ডার মুছুন"
                            className="p-1.5 rounded-lg text-[#a69ab1] hover:text-[#ff6b83] hover:bg-[#351822] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
