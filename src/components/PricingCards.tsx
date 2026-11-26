"use client";

import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function PricingCards() {
  // По ТЗ вкладка и блок цен/тарифов скрыты, если showPricing = false
  if (!siteConfig.features.showPricing) {
    return null;
  }

  return (
    <section
      id="pricing"
      className="relative bg-[#0B0E14] py-16 sm:py-24 border-b border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F5B041]/30 bg-[#111622] px-3.5 py-1 text-xs font-bold tracking-wider text-[#F5B041]">
            <Sparkles className="h-3.5 w-3.5" />
            {siteConfig.pricing.badge}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {siteConfig.pricing.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {siteConfig.pricing.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {siteConfig.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-8 ${
                plan.highlighted
                  ? "border-[#F5B041] bg-[#111622] shadow-[0_0_40px_rgba(245,176,65,0.15)]"
                  : "border-white/10 bg-[#111622]/80"
              }`}
            >
              <div>
                <span className="inline-block rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-bold text-[#F5B041]">
                  {plan.tag}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-extrabold transition ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-[#F5B041] to-[#00E676] text-[#0B0E14]"
                    : "border border-white/15 bg-[#0B0E14] text-white hover:border-[#F5B041]"
                }`}
              >
                {plan.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
