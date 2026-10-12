import React, { useState } from 'react';
import {
  Order,
  OrderStatus,
  CourierService,
  SystemConfig,
  Language,
} from '../types';
import {
  Search,
  Filter,
  Printer,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  XCircle,
  ExternalLink,
  Phone,
  MapPin,
  Package,
  Calendar,
  AlertCircle,
  Share2,
} from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  config: SystemConfig;
  couriers: CourierService[];
  lang: Language;
  onUpdateOrderStatus: (orderId: number, status: OrderStatus) => void;
  onDeleteOrder: (orderId: number) => void;
  onOpenInvoice: (order: Order) => void;
  onAssignCourier?: (orderId: number, courierName: string, trackingCode: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  config,
  couriers,
  lang,
  onUpdateOrderStatus,
  onDeleteOrder,
  onOpenInvoice,
  onAssignCourier,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [courierModalOrder, setCourierModalOrder] = useState<Order | null>(null);
  const [courierName, setCourierName] = useState('Steadfast');
  const [trackingId, setTrackingId] = useState('');

  const statuses: { id: string; label: string; count: number }[] = [
    { id: 'all', label: lang === 'bn' ? 'সকল অর্ডার' : 'All', count: orders.length },
    { id: 'Pending', label: lang === 'bn' ? 'পেন্ডিং' : 'Pending', count: orders.filter((o) => o.status === 'Pending').length },
    { id: 'Confirmed', label: lang === 'bn' ? 'কনফার্মড' : 'Confirmed', count: orders.filter((o) => o.status === 'Confirmed').length },
    { id: 'Packaging', label: lang === 'bn' ? 'প্যাকিং' : 'Packaging', count: orders.filter((o) => o.status === 'Packaging').length },
    { id: 'In Courier', label: lang === 'bn' ? 'কুরিয়ারে' : 'In Courier', count: orders.filter((o) => o.status === 'In Courier').length },
    { id: 'Delivered', label: lang === 'bn' ? 'ডেলিভার্ড' : 'Delivered', count: orders.filter((o) => o.status === 'Delivered').length },
    { id: 'Cancelled', label: lang === 'bn' ? 'বাতিল' : 'Cancelled', count: orders.filter((o) => o.status === 'Cancelled').length },
    { id: 'Returned', label: lang === 'bn' ? 'রিটার্ন' : 'Returned', count: orders.filter((o) => o.status === 'Returned').length },
  ];

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = String(order.id).includes(q);
      const matchName = order.customer.toLowerCase().includes(q);
      const matchPhone = order.phone.includes(q);
      const matchAddress = order.address.toLowerCase().includes(q);
      return matchId || matchName || matchPhone || matchAddress;
    }
    return true;
  });

  const handleSendToCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courierModalOrder) return;
    const tracking = trackingId.trim() || `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    if (onAssignCourier) {
      onAssignCourier(courierModalOrder.id, courierName, tracking);
    } else {
      onUpdateOrderStatus(courierModalOrder.id, 'In Courier');
    }
    setCourierModalOrder(null);
    setTrackingId('');
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8e829d] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'bn' ? 'অর্ডার আইডি, ফোন বা নাম দিয়ে খুঁজুন...' : 'Search by Order ID, Phone or Name...'}
              className="w-full bg-[#120f1a] border border-[#342b40] focus:border-[#bd70df] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#685c74] focus:outline-none transition-colors"
            />
          </div>
          <div className="text-xs text-[#a69ab1]">
            {lang === 'bn' ? `মোট ${filteredOrders.length} টি অর্ডার প্রদর্শিত` : `Showing ${filteredOrders.length} orders`}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {statuses.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === tab.id
                  ? 'bg-[#bd70df] text-white shadow-sm font-semibold'
                  : 'bg-[#231c2e] text-[#a69ab1] hover:text-white hover:bg-[#2e243c]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedStatus === tab.id ? 'bg-white/30 text-white' : 'bg-black/30 text-[#8e829d]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2d2538] bg-[#14111c] text-[#8e829d]">
                <th className="py-3 px-4">অর্ডার আইডি ও তারিখ</th>
                <th className="py-3 px-4">গ্রাহকের বিবরণ</th>
                <th className="py-3 px-4">অর্ডারকৃত আইটেম</th>
                <th className="py-3 px-4">পেমেন্ট / মোট</th>
                <th className="py-3 px-4">কুরিয়ার ও স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2538]/50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8e829d]">
                    কোনো অর্ডার পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">#{order.id}</div>
                      <div className="text-[11px] text-[#8e829d] flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-semibold text-white">{order.customer}</div>
                      <a
                        href={`tel:${order.phone}`}
                        className="text-[11px] text-[#bd70df] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{order.phone}</span>
                      </a>
                      <div className="text-[10px] text-[#8e829d] truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{order.address}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-white text-[11px] truncate">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-[#a69ab1] ml-1">×{item.qty}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-amber-300 text-sm">৳ {order.total.toLocaleString()}</div>
                      <div className="text-[10px] text-[#8e829d] mt-0.5">
                        {order.paymentMethod || 'COD'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        {/* Status Select */}
                        <select
                          value={order.status}
                          onChange={(e) =>
                            onUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="bg-[#120f1a] border border-[#342b40] text-xs font-semibold rounded-lg px-2 py-1 text-white focus:outline-none focus:border-[#bd70df] cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packaging">Packaging</option>
                          <option value="In Courier">In Courier</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                        </select>

                        {/* Courier pill */}
                        {order.courierService ? (
                          <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            <span>{order.courierService}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCourierModalOrder(order)}
                            className="text-[10px] text-[#bd70df] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Truck className="w-3 h-3" />
                            <span>+ কুরিয়ারে পাঠান</span>
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenInvoice(order)}
                          className="p-1.5 rounded-lg bg-[#251f33] hover:bg-[#342b45] text-amber-300 transition-colors cursor-pointer"
                          title="চালান প্রিন্ট"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`https://wa.me/88${order.phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(order.customer)},%20your%20Alvina%20order%20%23${order.id}%20total%20৳${order.total}%20is%20received.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
                          title="WhatsApp মেসেজ দিন"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            if (window.confirm('আপনি কি নিশ্চিত যে এই অর্ডারটি ডিলিট করতে চান?')) {
                              onDeleteOrder(order.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                          title="ডিলিট করুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Courier Assign Modal */}
      {courierModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#181422] border border-[#342b40] rounded-2xl p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-white mb-1">কুরিয়ারে পার্সেল পাঠান</h4>
            <p className="text-xs text-[#a69ab1] mb-4">অর্ডার #{courierModalOrder.id} - {courierModalOrder.customer}</p>

            <form onSubmit={handleSendToCourier} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#cbbdd7] mb-1">কুরিয়ার সার্ভিস নির্বাচন করুন</label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                >
                  <option value="Steadfast">Steadfast Courier</option>
                  <option value="Pathao">Pathao Courier</option>
                  <option value="RedX">RedX Logistics</option>
                  <option value="Paperfly">Paperfly</option>
                </select>
              </div>

              <div>
                <label className="block text-[#cbbdd7] mb-1">ট্র্যাকিং কোড (অপশনাল)</label>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="যেমন: ST-82910"
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCourierModalOrder(null)}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a69ab1] font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#bd70df] text-white font-bold hover:bg-[#ce85ef]"
                >
                  পার্সেল বুক করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
