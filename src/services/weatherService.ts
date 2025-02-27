import axios from 'axios';
import { WeatherByCity, WeatherByCoordinates, WeatherServiceConfig } from '../types/weather';

export class WeatherService {
  private readonly config: WeatherServiceConfig;

  constructor(config: WeatherServiceConfig) {
    this.config = config;
  }

  async getWeatherByCity(city: string): Promise<WeatherByCity> {
    try {
      const response = await axios.get(`${this.config.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.config.apiKey,
          units: 'metric',
          lang: 'fr'
        }
      });

      return {
        city: response.data.name,
        temperature: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error(`City "${city}" not found`);
      }
      throw error;
    }
  }

  async getWeatherByCoordinates(lat: number, lng: number): Promise<WeatherByCoordinates> {
    try {
      const response = await axios.get(`${this.config.baseUrl}/weather`, {
        params: {
          lat,
          lon: lng,
          appid: this.config.apiKey,
          units: 'metric',
          lang: 'fr'
        }
      });

      return {
        latitude: lat,
        longitude: lng,
        temperature: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error('Invalid coordinates');
      }
      throw error;
    }
  }
}
