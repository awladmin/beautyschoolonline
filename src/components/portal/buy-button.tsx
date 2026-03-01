"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BuyButtonProps {
  courseId: string;
  courseSlug: string;
}

export function BuyButton({ courseId, courseSlug }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, courseSlug }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to start checkout");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button className="w-full py-6 text-base font-semibold" onClick={handleBuy} disabled={loading}>
        {loading ? "Redirecting to checkout..." : "Buy Now"}
      </Button>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          className="h-[70px] w-[70px]"
          aria-hidden="true"
        >
          <rect fill="#635BFF" width="28" height="28" rx="6" />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M13.3 11.5c0-.77.63-1.07 1.68-1.07 1.5 0 3.4.46 4.9 1.27V7.83c-1.64-.65-3.26-.91-4.9-.91-4.01 0-6.68 2.1-6.68 5.6 0 5.46 7.52 4.59 7.52 6.94 0 .91-.79 1.21-1.9 1.21-1.64 0-3.74-.68-5.4-1.58v3.94c1.84.79 3.7 1.13 5.4 1.13 4.11 0 6.93-2.03 6.93-5.58-.01-5.9-7.55-4.85-7.55-7.08Z"
          />
        </svg>
        <span>You&apos;ll be taken to Stripe to complete your payment securely</span>
      </div>
    </div>
  );
}
