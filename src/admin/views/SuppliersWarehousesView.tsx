import React from 'react';
import { Supplier, Warehouse, Language } from '../types';
import { Warehouse as WarehouseIcon, Building, Phone, MapPin } from 'lucide-react';

interface SuppliersWarehousesViewProps {
  suppliers: Supplier[];
  warehouses: Warehouse[];
  lang: Language;
}

export const SuppliersWarehousesView: React.FC<SuppliersWarehousesViewProps> = ({
  suppliers,
  warehouses,
  lang,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <WarehouseIcon className="w-5 h-5 text-[#bd70df]" />
          <span>সাপ্লায়ার ও ওয়্যারহাউস ম্যানেজমেন্ট</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          পাকিস্তানি লন ইম্পোর্টার, লোকাল ফেব্রিক্স সাপ্লায়ার ও সেন্ট্রাল গোডাউন লোকেশন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suppliers */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            <span>ফেব্রিক ও ড্রেস সাপ্লায়ার্স</span>
          </h4>
          <div className="space-y-2">
            {suppliers.map((s) => (
              <div key={s.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{s.companyName}</span>
                  <span className="text-[10px] text-amber-300 font-bold">{s.materialType}</span>
                </div>
                <div className="text-[11px] text-[#a69ab1] flex items-center gap-2">
                  <Phone className="w-3 h-3 text-[#8e829d]" />
                  <span>{s.contactPerson} • {s.phone}</span>
                </div>
                <div className="text-[10px] text-rose-400">
                  বকেয়া দেনা: ৳ {s.balanceDue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warehouses */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <WarehouseIcon className="w-4 h-4 text-emerald-400" />
            <span>সেন্ট্রাল ওয়্যারহাউস ও হাব</span>
          </h4>
          <div className="space-y-2">
            {warehouses.map((w) => (
              <div key={w.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{w.name}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">ক্যাপাসিটি: {w.totalCapacity}</span>
                </div>
                <div className="text-[11px] text-[#a69ab1] flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-[#8e829d]" />
                  <span>{w.location} (ম্যানেজার: {w.manager}, {w.phone})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
