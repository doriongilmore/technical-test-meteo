import { Request, Response } from "express";
import { WeatherRequest } from "../types/weather";
import { WeatherService } from "../services/weatherService";

export class WeatherController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly weatherService: WeatherService) {}

    private buildCityRequest(city: string): WeatherRequest {
        return {
            type: "city",
            city,
        };
    }

    private buildCoordinatesRequest(lat: number, lng: number): WeatherRequest {
        return {
            type: "coordinates",
            latitude: lat,
            longitude: lng,
        };
    }

    private validateCoordinates(
        lat: unknown,
        lng: unknown,
    ): { isValid: boolean; lat?: number; lng?: number } {
        if (
            typeof lat !== "string" ||
            typeof lng !== "string" ||
            Array.isArray(lat) ||
            Array.isArray(lng)
        ) {
            return { isValid: false };
        }

        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        if (isNaN(latitude) || isNaN(longitude)) {
            return { isValid: false };
        }

        return { isValid: true, lat: latitude, lng: longitude };
    }

    getWeather = async (req: Request, res: Response): Promise<void> => {
        try {
            const { city, lat, lng } = req.query;
            let request: WeatherRequest;

            if (city) {
                request = this.buildCityRequest(city as string);
            } else if (lat && lng) {
                const coords = this.validateCoordinates(lat, lng);
                if (!coords.isValid) {
                    res.status(400).json({ error: "Invalid coordinates format" });
                    return;
                }
                request = this.buildCoordinatesRequest(coords.lat!, coords.lng!);
            } else {
                res.status(400).json({
                    error: "Missing required parameters: either city or lat/lng must be provided",
                });
                return;
            }

            const weather = await this.weatherService.getWeather(request);
            res.json(weather);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
}
