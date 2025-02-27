import express, { type Express } from "express";
import dotenv from "dotenv";
import { WeatherController } from "./controllers/weatherController";
import { WeatherService } from "./services/weatherService";

dotenv.config();

const app: Express = express();

if (!process.env.WEATHER_API_KEY) {
    throw new Error("WEATHER_API_KEY environment variable is required");
}

const weatherService = new WeatherService({
    apiKey: process.env.WEATHER_API_KEY,
    baseUrl: "https://api.openweathermap.org/data/2.5",
});

const weatherController = new WeatherController(weatherService);

app.use(express.json());

app.get("/weather", weatherController.getWeather);

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

export default app;
