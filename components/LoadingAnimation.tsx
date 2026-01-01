"use client";

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-blue-500/20 rounded-full"></div>
        <div
          className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>

      <div className="relative w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan"></div>
      </div>

      <p className="text-gray-400 text-lg font-medium animate-pulse-slow">finding movies...</p>
    </div>
  );
}
