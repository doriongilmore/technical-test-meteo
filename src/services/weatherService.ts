import axios from "axios";
import { WeatherRequest, WeatherResponse, WeatherServiceConfig } from "../types/weather";

interface WeatherApiResponse {
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
    }>;
    name?: string;
    coord?: {
        lat: number;
        lon: number;
    };
}

export class WeatherService {
    private readonly config: WeatherServiceConfig;

    constructor(config: WeatherServiceConfig) {
        this.config = config;
    }

    private buildRequestParams(request: WeatherRequest) {
        return {
            ...(request.type === "city"
                ? { q: request.city }
                : { lat: request.latitude, lon: request.longitude }),
            appid: this.config.apiKey,
            units: "metric",
            lang: "fr",
        };
    }

    private buildWeatherResponse(
        data: WeatherApiResponse,
        request: WeatherRequest,
    ): WeatherResponse {
        const weatherData = {
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            description: data.weather[0].description,
        };

        return {
            ...weatherData,
            ...(request.type === "city"
                ? { city: data.name! }
                : {
                      latitude: data.coord!.lat,
                      longitude: data.coord!.lon,
                  }),
        };
    }

    private buildErrorMessage(error: unknown, request: WeatherRequest): string {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            const location =
                request.type === "city"
                    ? `City "${request.city}"`
                    : `Location at coordinates (${request.latitude}, ${request.longitude})`;
            return `${location} not found`;
        }
        return error instanceof Error ? error.message : "Unknown error occurred";
    }

    async getWeather(request: WeatherRequest): Promise<WeatherResponse> {
        try {
            const params = this.buildRequestParams(request);
            const response = await axios.get<WeatherApiResponse>(
                `${this.config.baseUrl}/weather`,
                {
                    params,
                },
            );
            return this.buildWeatherResponse(response.data, request);
        } catch (error) {
            throw new Error(this.buildErrorMessage(error, request));
        }
    }
}
