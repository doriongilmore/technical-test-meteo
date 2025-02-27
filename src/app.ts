import express from "express";
import { createWeatherRouter } from "./routes/weather";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

export const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/weather", createWeatherRouter());
    app.use(notFound);
    app.use(errorHandler);

    return app;
};
