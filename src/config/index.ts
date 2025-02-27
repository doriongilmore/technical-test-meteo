export interface AppConfig {
    port: number;
    weather: {
        apiKey: string;
        baseUrl: string;
    };
}

export const config: AppConfig = {
    port: parseInt(process.env.PORT || "7000", 10),
    weather: {
        apiKey: process.env.WEATHER_API_KEY || "",
        baseUrl: "https://api.openweathermap.org/data/2.5",
    },
};
