import { getMarineWeather } from "@/lib/weather";
import { Wind, Waves, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

export async function LiveConditions() {
    const weather = await getMarineWeather();

    if (!weather) {
        return (
            <div className="aspect-[4/5] bg-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
                <p className="text-neutral-500">Conditions Unavailable</p>
            </div>
        )
    }

    // Helper to rotate arrow based on direction
    const getRotation = (degrees: number) => ({ transform: `rotate(${degrees}deg)` });

    return (
        <div className="aspect-[4/5] bg-neutral-900 rounded-2xl p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Live Report</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-green-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        J-Bay
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">Jeffreys Bay</h3>
                <p className="text-sm text-neutral-400 font-light">Supertubes</p>
            </div>

            <div className="space-y-6 relative z-10">
                {/* Swell Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-200/80">
                        <Waves className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider font-semibold">Swell</span>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-5xl font-bold text-white tracking-tighter">
                            {weather.current.wave_height?.toFixed(1) ?? "0.0"}
                            <span className="text-lg text-neutral-500 font-normal ml-1">m</span>
                        </span>
                        <div className="flex flex-col pb-1">
                            <span className="text-sm font-light text-neutral-300">
                                {weather.current.wave_period?.toFixed(0) ?? "0"}s
                            </span>
                            <ArrowUp
                                className="w-4 h-4 text-blue-400 transition-transform duration-700 ease-out"
                                style={getRotation(weather.current.wave_direction ?? 0)}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-white/5" />

                {/* Wind Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-200/80">
                        <Wind className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider font-semibold">Wind</span>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold text-white tracking-tighter">
                            {weather.current.wind_speed?.toFixed(0) ?? "0"}
                            <span className="text-lg text-neutral-500 font-normal ml-1">kts</span>
                        </span>
                        <div className="flex flex-col pb-1">
                            <ArrowUp
                                className="w-4 h-4 text-emerald-400 transition-transform duration-700 ease-out"
                                style={getRotation(weather.current.wind_direction ?? 0)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 pt-4">
                <div className="text-[10px] text-neutral-600 font-mono">
                    UPDATED: {new Date(weather.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}
