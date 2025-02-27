import { WeatherService } from "../services/weatherService";
import { WeatherController } from "../controllers/weatherController";
import { config } from "../config";

export interface WeatherContainer {
    weatherService: WeatherService;
    weatherController: WeatherController;
}

export const createWeatherContainer = (): WeatherContainer => {
    if (!config.weather.apiKey) {
        throw new Error("WEATHER_API_KEY environment variable is required");
    }

    const weatherService = new WeatherService({
        apiKey: config.weather.apiKey,
        baseUrl: config.weather.baseUrl,
    });

    const weatherController = new WeatherController(weatherService);

    return { weatherService, weatherController };
};
