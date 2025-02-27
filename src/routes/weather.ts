import { Router } from "express";
import { createWeatherContainer } from "../containers/weatherContainer";

export const createWeatherRouter = () => {
    const router = Router();
    const container = createWeatherContainer();
    router.get("/", container.weatherController.getWeather);
    return router;
};
