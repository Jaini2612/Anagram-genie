
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle2, History, Sparkles } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Anagram Checker</h1>
                <p className="text-sm text-gray-500">Find word magic ✨</p>
              </div>
            </div>
            
            <nav className="flex items-center gap-1">
              <Link
                to={createPageUrl("AnagramChecker")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  location.pathname === createPageUrl("AnagramChecker")
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Checker
              </Link>
              <Link
                to={createPageUrl("History")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  location.pathname === createPageUrl("History")
                    ? "bg-purple-100 text-purple-700" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <History className="w-4 h-4" />
                History
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
