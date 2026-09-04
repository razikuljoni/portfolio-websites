'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  TrendingUp,
  Percent,
  DollarSign,
  PieChart,
  Calendar,
  Layers,
  ArrowRight,
  Printer,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { PROPERTIES } from '@/data/properties';

interface CalculatorPageProps {
  onScheduleConsultation: () => void;
}

/**
 * CalculatorPage Component
 * Full-featured Swiss Private Wealth Financial Suite with debt structuring,
 * cantonal tax calibration, gross/net yield analytics, and interactive amortization tables.
 */
export default function CalculatorPage({ onScheduleConsultation }: CalculatorPageProps) {
  // Inputs
  const [propertyPrice, setPropertyPrice] = useState<number>(18500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(1.65);
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [canton, setCanton] = useState<string>('Zurich'); // Zurich, Geneva, Graubunden, London, Tokyo, Aspen
  const [projectedMonthlyRent, setProjectedMonthlyRent] = useState<number>(45000);

  // Cantonal tax coefficients
  const taxRates: Record<string, { propertyTax: number; notaryTransfer: number }> = {
    Zurich: { propertyTax: 0.0015, notaryTransfer: 0.015 },
    Geneva: { propertyTax: 0.0022, notaryTransfer: 0.03 },
    Graubunden: { propertyTax: 0.0018, notaryTransfer: 0.02 },
    London: { propertyTax: 0.005, notaryTransfer: 0.05 },
    Tokyo: { propertyTax: 0.004, notaryTransfer: 0.035 },
    Aspen: { propertyTax: 0.006, notaryTransfer: 0.015 },
  };

  // Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;

  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyMortgage = useMemo(() => {
    if (loanPrincipal <= 0) return 0;
    if (monthlyInterestRate === 0) return loanPrincipal / numberOfPayments;
    return (
      (loanPrincipal *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    );
  }, [loanPrincipal, monthlyInterestRate, numberOfPayments]);

  const currentCanton = taxRates[canton] || taxRates.Zurich;
  const monthlyPropertyTax = (propertyPrice * currentCanton.propertyTax) / 12;
  const monthlyInsuranceAndMaint = (propertyPrice * 0.004) / 12;
  const totalMonthlyOutflow = monthlyMortgage + monthlyPropertyTax + monthlyInsuranceAndMaint;

  // Investment Yield Metrics
  const annualGrossRentalIncome = projectedMonthlyRent * 12;
  const grossRentalYield = (annualGrossRentalIncome / propertyPrice) * 100;
  const netAnnualOperatingIncome = annualGrossRentalIncome - (monthlyPropertyTax + monthlyInsuranceAndMaint) * 12;
  const netCapRate = (netAnnualOperatingIncome / propertyPrice) * 100;
  const annualCashFlow = annualGrossRentalIncome - totalMonthlyOutflow * 12;
  const cashOnCashReturn = (annualCashFlow / downPaymentAmount) * 100;

  // Amortization First 5 Years Table Data
  const amortizationSchedule = useMemo(() => {
    let balance = loanPrincipal;
    const schedule = [];
    for (let year = 1; year <= Math.min(loanTermYears, 10); year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const interest = balance * monthlyInterestRate;
        const principal = monthlyMortgage - interest;
        yearlyInterest += interest;
        yearlyPrincipal += principal;
        balance -= principal;
      }
      schedule.push({
        year,
        yearlyPrincipal,
        yearlyInterest,
        endingBalance: Math.max(0, balance),
      });
    }
    return schedule;
  }, [loanPrincipal, monthlyInterestRate, monthlyMortgage, loanTermYears]);

  return (
    <div id="calculator-view" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-stone-800 pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Swiss Private Wealth Suite
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-bold text-stone-100 tracking-tight">
          Financial & Investment Simulator
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl font-light leading-relaxed">
          Calibrate Swiss mortgage amortization, cantonal tax rates (Zurich, Geneva, Graubünden), and yield modeling for prime acquisitions.
        </p>
      </div>

      {/* Preset Price Quick Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
        <span className="text-stone-500 uppercase tracking-wider flex-shrink-0">
          Preset Portfolios:
        </span>
        {PROPERTIES.slice(0, 5).map((p) => (
          <button
            key={p.id}
            onClick={() => setPropertyPrice(p.price)}
            className={`px-3 py-1 rounded-full border whitespace-nowrap transition-colors ${
              propertyPrice === p.price
                ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
            }`}
          >
            {p.location.city} • {p.priceFormatted}
          </button>
        ))}
      </div>

      {/* Main 2-Column Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Sliders & Selectors (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="text-sm font-mono uppercase tracking-wider text-amber-500 font-bold border-b border-stone-800 pb-3">
            Acquisition & Debt Parameters
          </h2>

          {/* Property Valuation */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-300 uppercase">Property Valuation</span>
              <span className="text-amber-400 font-bold text-base">
                CHF {propertyPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={2000000}
              max={60000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Down Payment % and Amount */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-300 uppercase">
                Equity Contribution ({downPaymentPercent}%)
              </span>
              <span className="text-stone-100 font-semibold">
                CHF {Math.round(downPaymentAmount).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>10% (Min Swiss)</span>
              <span>20% (Standard)</span>
              <span>80%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-300 uppercase">Interest Rate (SARON / Fixed)</span>
              <span className="text-amber-400 font-bold text-base">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={6.0}
              step={0.05}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Loan Term & Jurisdiction 2-Cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Term */}
            <div>
              <label className="block text-xs font-mono uppercase text-stone-300 mb-1.5">
                Amortization Horizon
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value={10}>10 Years (Bespoke)</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years (Swiss Standard)</option>
                <option value={30}>30 Years</option>
              </select>
            </div>

            {/* Canton */}
            <div>
              <label className="block text-xs font-mono uppercase text-stone-300 mb-1.5">
                Jurisdiction & Tax Regimes
              </label>
              <select
                value={canton}
                onChange={(e) => setCanton(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Zurich">Canton Zurich (0.15% p.a.)</option>
                <option value="Geneva">Canton Geneva (0.22% p.a.)</option>
                <option value="Graubunden">Graubünden / Engadin (0.18%)</option>
                <option value="London">London (0.50%)</option>
                <option value="Tokyo">Tokyo (0.40%)</option>
                <option value="Aspen">Aspen Pitkin (0.60%)</option>
              </select>
            </div>
          </div>

          {/* Projected Monthly Rental Income (For Yield Analysis) */}
          <div className="pt-3 border-t border-stone-800 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-300 uppercase">
                Projected Monthly Rental Yield (CHF)
              </span>
              <span className="text-emerald-400 font-bold">
                CHF {projectedMonthlyRent.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={150000}
              step={2500}
              value={projectedMonthlyRent}
              onChange={(e) => setProjectedMonthlyRent(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* Right Column: Key Breakdown & Yield Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Monthly Payment Summary Box */}
          <div className="bg-stone-900 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
              Estimated Monthly Outflow
            </span>

            <div>
              <p className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-400">
                CHF {Math.round(totalMonthlyOutflow).toLocaleString()}
                <span className="text-xs font-normal text-stone-400"> / month</span>
              </p>
              <p className="text-xs font-mono text-stone-400 mt-1">
                Debt Service + Cantonal Tax + Reserves
              </p>
            </div>

            {/* Outflow Breakdown Items */}
            <div className="space-y-2.5 pt-4 border-t border-stone-800 text-xs font-mono">
              <div className="flex justify-between text-stone-300">
                <span>Principal & Interest ({interestRate}%):</span>
                <span className="font-semibold text-stone-100">
                  CHF {Math.round(monthlyMortgage).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Cantonal Property Tax ({canton}):</span>
                <span className="font-semibold text-stone-100">
                  CHF {Math.round(monthlyPropertyTax).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Maintenance & Structural Reserve:</span>
                <span className="font-semibold text-stone-100">
                  CHF {Math.round(monthlyInsuranceAndMaint).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Capital Requirement at Closing */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5 font-mono text-xs">
              <span className="text-[10px] text-stone-400 uppercase">
                Estimated Closing Liquidity Required
              </span>
              <p className="text-lg font-bold text-stone-100">
                CHF{' '}
                {Math.round(
                  downPaymentAmount + propertyPrice * currentCanton.notaryTransfer
                ).toLocaleString()}
              </p>
              <p className="text-[10px] text-stone-500">
                Includes down payment + ~{(currentCanton.notaryTransfer * 100).toFixed(1)}% notary & stamp fees.
              </p>
            </div>
          </div>

          {/* Investment Yield Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
              Investor Yield & Cap Rate Analysis
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block">Gross Yield</span>
                <span className="text-lg font-bold text-stone-100">{grossRentalYield.toFixed(2)}%</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block">Net Cap Rate</span>
                <span className="text-lg font-bold text-emerald-400">{netCapRate.toFixed(2)}%</span>
              </div>
            </div>

            <div className="flex justify-between text-stone-300 pt-2 border-t border-stone-800">
              <span>Annual Net Cash Flow:</span>
              <span className={`font-bold ${annualCashFlow >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                CHF {Math.round(annualCashFlow).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AMORTIZATION SCHEDULE TABLE */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-100">
              10-Year Amortization Trajectory
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              Loan Principal: CHF {Math.round(loanPrincipal).toLocaleString()} • {loanTermYears} Years @ {interestRate}%
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300 hover:text-amber-400 hover:border-amber-500 transition-colors self-start"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Financial Audit</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 uppercase text-[10px]">
                <th className="pb-3">Year</th>
                <th className="pb-3">Principal Repaid</th>
                <th className="pb-3">Interest Incurred</th>
                <th className="pb-3 text-right">Remaining Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {amortizationSchedule.map((row) => (
                <tr key={row.year} className="hover:bg-stone-800/30 transition-colors">
                  <td className="py-3 text-stone-300 font-semibold">Year {row.year}</td>
                  <td className="py-3 text-emerald-400">
                    CHF {Math.round(row.yearlyPrincipal).toLocaleString()}
                  </td>
                  <td className="py-3 text-stone-400">
                    CHF {Math.round(row.yearlyInterest).toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-stone-100 font-bold">
                    CHF {Math.round(row.endingBalance).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-stone-100">
          Seek Structured Swiss Private Banking & Lombard Financing?
        </h3>
        <p className="text-xs text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
          We maintain direct relationships with Credit Suisse, UBS Private Wealth, and Pictet for bespoke mortgage structuring and collateral credit facilities.
        </p>
        <button
          onClick={onScheduleConsultation}
          className="px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all"
        >
          Consult Private Wealth Desk
        </button>
      </div>
    </div>
  );
}
