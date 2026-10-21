import React from 'react';
import { Receipt, CheckCircle2 } from 'lucide-react';

/**
 * THERMAL TICKET (BONUS B)
 * -------------------------------------------------------------
 * Realistic takeaway kitchen docket that prints downward with a subtle
 * mechanical jitter and tear-off serration pattern.
 */
export default function ThermalTicket({ ticketRef, isLight = true }) {
  return (
    <div className="w-full flex justify-center mt-10 pointer-events-none" aria-hidden="true">
      <div
        ref={ticketRef}
        className="w-full max-w-sm rounded-lg p-4 shadow-warm font-mono text-xs overflow-hidden opacity-0 will-change-transform transform-gpu border"
        style={{
          backgroundColor: isLight ? '#fffdfa' : '#1f1813',
          borderColor: isLight ? 'rgba(23, 17, 13, 0.12)' : 'rgba(255, 255, 255, 0.12)',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 97% 98%, 94% 100%, 91% 98%, 88% 100%, 85% 98%, 82% 100%, 79% 98%, 76% 100%, 73% 98%, 70% 100%, 67% 98%, 64% 100%, 61% 98%, 58% 100%, 55% 98%, 52% 100%, 49% 98%, 46% 100%, 43% 98%, 40% 100%, 37% 98%, 34% 100%, 31% 98%, 28% 100%, 25% 98%, 22% 100%, 19% 98%, 16% 100%, 13% 98%, 10% 100%, 7% 98%, 4% 100%, 0% 98%)',
        }}
      >
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b border-dashed pb-2 mb-2" style={{ borderColor: isLight ? 'rgba(23, 17, 13, 0.2)' : 'rgba(255, 255, 255, 0.2)' }}>
          <div className="flex items-center gap-1.5 font-bold text-orange-burnt">
            <Receipt className="w-3.5 h-3.5" />
            <span>HOMERS KITCHEN DOCKET</span>
          </div>
          <span className="text-[10px] opacity-60">#HOM-4092</span>
        </div>

        {/* Order Items */}
        <div className="space-y-1 text-[11px] mb-3">
          <div className="flex justify-between">
            <span>1x Crown Jewel Double Cheese</span>
            <span className="font-bold">$18.90</span>
          </div>
          <div className="flex justify-between">
            <span>1x Hand-Cut Hot Chips (Large)</span>
            <span className="font-bold">$7.50</span>
          </div>
          <div className="text-[10px] text-orange-burnt pl-2">
            * Secret Chicken Salt: Generous
          </div>
        </div>

        {/* Status Line */}
        <div className="border-t border-dashed pt-2 flex items-center justify-between text-[11px]" style={{ borderColor: isLight ? 'rgba(23, 17, 13, 0.2)' : 'rgba(255, 255, 255, 0.2)' }}>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>DIRECT KITCHEN CONFIRMED</span>
          </span>
          <span className="font-bold px-2 py-0.5 rounded bg-orange-burnt/15 text-orange-burnt text-[10px]">
            Ready in 15m
          </span>
        </div>
      </div>
    </div>
  );
}
