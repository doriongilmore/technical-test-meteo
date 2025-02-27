import express from "express";
import { config } from "./config";
import { createWeatherRouter } from "./routes/weather";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

export const createApp = () => {
    if (!config.weather.apiKey) {
        throw new Error("WEATHER_API_KEY environment variable is required");
    }

    const app = express();
    app.use(express.json());
    app.use("/weather", createWeatherRouter());
    app.use(notFound);
    app.use(errorHandler);

    return app;
};
