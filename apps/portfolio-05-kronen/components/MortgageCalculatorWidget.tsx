'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, Shield, Building2, TrendingUp, PieChart as PieIcon, Info } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  currency?: string;
  className?: string;
}

/**
 * MortgageCalculatorWidget Component
 * Advanced Swiss real estate financial tool offering monthly amortization breakdowns,
 * tax estimation, down payment sliders, and investment cash flow metrics.
 */
export default function MortgageCalculatorWidget({
  initialPrice = 14500000,
  currency = 'CHF',
  className = '',
}: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(2.25);
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(0.25); // % annual
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(4500);
  const [hoaMonthly, setHoaMonthly] = useState<number>(1200);

  // Derived financial computations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;

  const calculations = useMemo(() => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyInterestRate > 0) {
      monthlyPrincipalInterest =
        (loanPrincipal *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, totalPayments))) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    } else {
      monthlyPrincipalInterest = loanPrincipal / totalPayments;
    }

    const monthlyPropertyTax = (propertyPrice * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = homeInsuranceAnnual / 12;
    const totalMonthlyPayment =
      monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + hoaMonthly;

    const totalCostOfLoan = monthlyPrincipalInterest * totalPayments;
    const totalInterestPaid = totalCostOfLoan - loanPrincipal;

    return {
      monthlyPrincipalInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      hoaMonthly,
      totalMonthlyPayment,
      totalCostOfLoan,
      totalInterestPaid,
    };
  }, [
    propertyPrice,
    loanPrincipal,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    homeInsuranceAnnual,
    hoaMonthly,
  ]);

  const pAndIPercent = Math.round(
    (calculations.monthlyPrincipalInterest / calculations.totalMonthlyPayment) * 100
  );
  const taxPercent = Math.round(
    (calculations.monthlyPropertyTax / calculations.totalMonthlyPayment) * 100
  );
  const insurancePercent = Math.round(
    (calculations.monthlyInsurance / calculations.totalMonthlyPayment) * 100
  );
  const hoaPercent = Math.max(0, 100 - pAndIPercent - taxPercent - insurancePercent);

  return (
    <div
      id="mortgage-financial-calculator"
      className={`bg-stone-900 border border-stone-800 rounded-xl p-6 sm:p-8 text-stone-100 shadow-xl ${className}`}
    >
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-amber-500 font-semibold">
              Swiss Real Estate Financial Engine
            </h3>
          </div>
          <p className="text-xs text-stone-400">
            Interactive amortization, tax allocation, and debt service analysis
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono uppercase text-stone-400 block">
            Estimated Monthly Outlay
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
            {currency} {Math.round(calculations.totalMonthlyPayment).toLocaleString()}
          </span>
          <span className="text-[10px] text-stone-500 block">/ month (all inclusive)</span>
        </div>
      </div>

      {/* Main Grid: Controls + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Sliders & Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono uppercase text-stone-300">
                Property Valuation
              </label>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                {currency} {propertyPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
              <span>1M</span>
              <span>25M</span>
              <span>50M+</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono uppercase text-stone-300">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-xs font-mono text-stone-200">
                {currency} {Math.round(downPaymentAmount).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
              <span>10% (Min Swiss Equity)</span>
              <span>20% (Standard)</span>
              <span>60%</span>
            </div>
          </div>

          {/* Interest Rate & Loan Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-300 mb-2">
                Interest Rate (%)
              </label>
              <div className="flex items-center bg-stone-950 border border-stone-800 rounded-lg px-3 py-2">
                <Percent className="w-4 h-4 text-stone-500 mr-2" />
                <input
                  type="number"
                  step="0.05"
                  min="0.5"
                  max="10"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-transparent text-xs font-mono text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-300 mb-2">
                Amortization Period
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value={15}>15 Years (Accelerated)</option>
                <option value={20}>20 Years (Medium)</option>
                <option value={25}>25 Years (Swiss Standard)</option>
                <option value={30}>30 Years (Extended)</option>
              </select>
            </div>
          </div>

          {/* Secondary Financial Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-mono text-stone-400 mb-1">
                Cantonal Tax (%/yr)
              </label>
              <input
                type="number"
                step="0.05"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-mono text-stone-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-400 mb-1">
                Annual Insurance
              </label>
              <input
                type="number"
                step="500"
                value={homeInsuranceAnnual}
                onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-mono text-stone-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-400 mb-1">
                Monthly HOA / Estate
              </label>
              <input
                type="number"
                step="100"
                value={hoaMonthly}
                onChange={(e) => setHoaMonthly(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-mono text-stone-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Visual Breakdown & Summary Cards */}
        <div className="lg:col-span-5 bg-stone-950/80 border border-stone-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-500" />
                Monthly Allocation
              </h4>
              <span className="text-[11px] font-mono text-stone-500">100% Breakdown</span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex mb-4 bg-stone-800">
              <div
                style={{ width: `${pAndIPercent}%` }}
                className="bg-amber-500 transition-all duration-300"
                title={`Principal & Interest: ${pAndIPercent}%`}
              />
              <div
                style={{ width: `${taxPercent}%` }}
                className="bg-amber-700 transition-all duration-300"
                title={`Taxes: ${taxPercent}%`}
              />
              <div
                style={{ width: `${insurancePercent}%` }}
                className="bg-stone-500 transition-all duration-300"
                title={`Insurance: ${insurancePercent}%`}
              />
              <div
                style={{ width: `${hoaPercent}%` }}
                className="bg-stone-700 transition-all duration-300"
                title={`HOA: ${hoaPercent}%`}
              />
            </div>

            {/* Detailed Row Breakdown */}
            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-800/80">
                <span className="flex items-center gap-2 text-stone-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Principal & Interest
                </span>
                <span className="text-stone-100 font-semibold">
                  {currency} {Math.round(calculations.monthlyPrincipalInterest).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-stone-800/80">
                <span className="flex items-center gap-2 text-stone-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                  Property Taxes
                </span>
                <span className="text-stone-100">
                  {currency} {Math.round(calculations.monthlyPropertyTax).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-stone-800/80">
                <span className="flex items-center gap-2 text-stone-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-500" />
                  Hazard / Home Insurance
                </span>
                <span className="text-stone-100">
                  {currency} {Math.round(calculations.monthlyInsurance).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="flex items-center gap-2 text-stone-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                  HOA & Estate Maintenance
                </span>
                <span className="text-stone-100">
                  {currency} {Math.round(calculations.hoaMonthly).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Total Metrics */}
          <div className="pt-4 border-t border-stone-800 text-[11px] font-mono text-stone-400 space-y-1.5">
            <div className="flex justify-between">
              <span>Total Borrowed:</span>
              <span className="text-stone-200">
                {currency} {loanPrincipal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Lifetime Interest:</span>
              <span className="text-amber-500/90">
                {currency} {Math.round(calculations.totalInterestPaid).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
