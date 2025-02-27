import axios from "axios";
import { WeatherRequest, WeatherResponse, WeatherServiceConfig } from "../types/weather";

export class WeatherService {
    private readonly config: WeatherServiceConfig;

    constructor(config: WeatherServiceConfig) {
        this.config = config;
    }

    async getWeather(request: WeatherRequest): Promise<WeatherResponse> {
        try {
            const params = {
                ...(request.type === "city"
                    ? { q: request.city }
                    : { lat: request.latitude, lon: request.longitude }),
                appid: this.config.apiKey,
                units: "metric",
                lang: "fr",
            };

            const response = await axios.get(`${this.config.baseUrl}/weather`, {
                params,
            });

            const weatherData = {
                temperature: Math.round(response.data.main.temp),
                humidity: response.data.main.humidity,
                description: response.data.weather[0].description,
            };

            return {
                ...weatherData,
                ...(request.type === "city"
                    ? { city: response.data.name }
                    : {
                          latitude: response.data.coord.lat,
                          longitude: response.data.coord.lon,
                      }),
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    const location =
                        request.type === "city"
                            ? `City "${request.city}"`
                            : `Location at coordinates (${request.latitude}, ${request.longitude})`;
                    throw new Error(`${location} not found`);
                }
                throw new Error(error.response?.data?.message || error.message);
            }
            throw error;
        }
    }
}
