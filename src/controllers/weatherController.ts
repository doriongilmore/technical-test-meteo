import { Request, Response } from "express";
import { WeatherService } from "../services/weatherService";
import { WeatherRequest } from "../types/weather";

export class WeatherController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly weatherService: WeatherService) {}

    getWeather = async (req: Request, res: Response): Promise<void> => {
        try {
            const { city, lat, lng } = req.query;

            let request: WeatherRequest;

            if (city) {
                request = {
                    type: "city",
                    city: city as string,
                };
            } else if (lat && lng) {
                const latitude = parseFloat(lat as string);
                const longitude = parseFloat(lng as string);

                if (isNaN(latitude) || isNaN(longitude)) {
                    res.status(400).json({ error: "Invalid coordinates format" });
                    return;
                }

                request = {
                    type: "coordinates",
                    latitude,
                    longitude,
                };
            } else {
                res.status(400).json({
                    error: "Missing required parameters: either city or lat/lng must be provided",
                });
                return;
            }

            const weather = await this.weatherService.getWeather(request);
            res.json(weather);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: "Internal server error" });
        }
    };
}
