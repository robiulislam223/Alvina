import React from 'react';
import { Order, ExpenseRecord, Language } from '../types';
import { BarChart2, DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface ReportsAccountingViewProps {
  orders: Order[];
  expenses: ExpenseRecord[];
  lang: Language;
}

export const ReportsAccountingView: React.FC<ReportsAccountingViewProps> = ({
  orders,
  expenses,
  lang,
}) => {
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const estimatedProfit = Math.round(totalSales * 0.35) - totalExpenses; // boutique margin

  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#bd70df]" />
          <span>বিজনেস রিপোর্ট ও লাভ-ক্ষতির (P&amp;L) হিসাব</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          মোট বিক্রয়, খরচ, ডেলিভারি কস্ট এবং নিট মুনাফা বিশ্লেষণ।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5">
          <span className="text-xs text-[#8e829d]">মোট গ্রস রেভিনিউ</span>
          <div className="text-2xl font-black text-amber-300 mt-2">৳ {totalSales.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">সব অর্ডার অন্তর্ভুক্ত</span>
        </div>

        <div className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5">
          <span className="text-xs text-[#8e829d]">মোট বিজনেস খরচ (Expenses)</span>
          <div className="text-2xl font-black text-rose-400 mt-2">৳ {totalExpenses.toLocaleString()}</div>
          <span className="text-[10px] text-[#8e829d] mt-1 block">অ্যাড ও প্যাকেজিং খরচ</span>
        </div>

        <div className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5">
          <span className="text-xs text-[#8e829d]">আনুমানিক নিট লাভ (Estimated Net Profit)</span>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            ৳ {Math.max(0, estimatedProfit).toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 mt-1 block">~35% গ্রস মার্জিন ভিত্তিক</span>
        </div>
      </div>

      {/* Expense ledger list */}
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white">সাম্প্রতিক খরচের খাতা</h4>
        <div className="divide-y divide-[#2d2538]/50 text-xs">
          {expenses.map((exp) => (
            <div key={exp.id} className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{exp.description}</p>
                <p className="text-[10px] text-[#8e829d]">{exp.date} • {exp.category} ({exp.paidBy})</p>
              </div>
              <span className="font-bold text-rose-400">৳ {exp.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
