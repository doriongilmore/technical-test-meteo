import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';

export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  getWeather = async (req: Request, res: Response): Promise<void> => {
    try {
      const { city, lat, lng } = req.query;

      if (city) {
        const weather = await this.weatherService.getWeatherByCity(city as string);
        res.json(weather);
        return;
      }

      if (lat && lng) {
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lng as string);

        if (isNaN(latitude) || isNaN(longitude)) {
          res.status(400).json({ error: 'Invalid coordinates format' });
          return;
        }

        const weather = await this.weatherService.getWeatherByCoordinates(latitude, longitude);
        res.json(weather);
        return;
      }

      res.status(400).json({ error: 'Missing required parameters: either city or lat/lng must be provided' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
