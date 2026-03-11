"use client";

import Link from "next/link";
import { Zap, AlertTriangle } from "lucide-react";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans flex flex-col justify-center items-center px-5">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <h1 className="font-syne text-2xl font-extrabold text-white mb-2">Authentication Error</h1>
        <p className="text-sm text-white/50 mb-8">
          Something went wrong during authentication. Please try again.
        </p>
        
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-medium"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
