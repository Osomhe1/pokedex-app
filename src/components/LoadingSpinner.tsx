import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = 48, className = "" }: { size?: number, className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 space-y-4 ${className}`}>
      <Loader2 
        size={size} 
        className="animate-spin text-red-500" 
      />
      <p className="text-slate-400 font-medium animate-pulse">Loading PokéData...</p>
    </div>
  );
}
