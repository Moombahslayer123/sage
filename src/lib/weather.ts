export interface MarineWeather {
    current: {
        time: string;
        wave_height: number;
        wave_direction: number;
        wave_period: number;
        wind_speed: number;
        wind_direction: number;
    };
}

// J-Bay coordinates (Jeffreys Bay, South Africa) - World class surf spot
const LAT = -34.0333;
const LON = 24.9167;

export async function getMarineWeather(): Promise<MarineWeather | null> {
    try {
        const params = new URLSearchParams({
            latitude: LAT.toString(),
            longitude: LON.toString(),
            current: "wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,wind_speed_10m,wind_direction_10m",
            wind_speed_unit: "kn",
            timezone: "auto",
        });

        const response = await fetch(
            `https://marine-api.open-meteo.com/v1/marine?${params.toString()}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        return {
            current: {
                time: data.current.time,
                wave_height: data.current.wave_height,
                wave_direction: data.current.wave_direction,
                wave_period: data.current.wave_period,
                wind_speed: data.current.wind_speed_10m,
                wind_direction: data.current.wind_direction_10m,
            },
        };
    } catch (error) {
        console.error("Weather fetch error:", error);
        return null;
    }
}
