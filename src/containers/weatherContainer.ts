import { WeatherService } from "../services/weatherService";
import { WeatherController } from "../controllers/weatherController";
import { config } from "../config";

export interface WeatherContainer {
    weatherService: WeatherService;
    weatherController: WeatherController;
}

export const createWeatherContainer = (): WeatherContainer => {
    const weatherService = new WeatherService({
        apiKey: config.weather.apiKey,
        baseUrl: config.weather.baseUrl,
    });

    const weatherController = new WeatherController(weatherService);

    return { weatherService, weatherController };
};
