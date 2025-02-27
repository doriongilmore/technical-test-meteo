import request from "supertest";
import express from "express";
import { WeatherController } from "./weatherController";
import { WeatherService } from "../services/weatherService";
import { WeatherRequest, WeatherResponse } from "../types/weather";

jest.mock("../services/weatherService");

describe("WeatherController", () => {
    let app: express.Express;
    let mockWeatherService: jest.Mocked<WeatherService>;

    beforeEach(() => {
        mockWeatherService = new WeatherService({
            apiKey: "test",
            baseUrl: "test",
        }) as jest.Mocked<WeatherService>;
        const weatherController = new WeatherController(mockWeatherService);

        app = express();
        app.get("/weather", weatherController.getWeather);
    });

    describe("GET /weather", () => {
        it("should return weather by city", async () => {
            const mockRequest: WeatherRequest = {
                type: "city",
                city: "Paris",
            };

            const mockResponse: WeatherResponse = {
                city: "Paris",
                temperature: 15,
                humidity: 82,
                description: "Ciel partiellement nuageux",
            };

            mockWeatherService.getWeather = jest.fn().mockResolvedValue(mockResponse);

            const response = await request(app).get("/weather").query({ city: "Paris" });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
            expect(mockWeatherService.getWeather).toHaveBeenCalledWith(mockRequest);
        });

        it("should return weather by coordinates", async () => {
            const mockRequest: WeatherRequest = {
                type: "coordinates",
                latitude: 48.8566,
                longitude: 2.3522,
            };

            const mockResponse: WeatherResponse = {
                latitude: 48.8566,
                longitude: 2.3522,
                temperature: 15,
                humidity: 82,
                description: "Ciel partiellement nuageux",
            };

            mockWeatherService.getWeather = jest.fn().mockResolvedValue(mockResponse);

            const response = await request(app)
                .get("/weather")
                .query({ lat: "48.8566", lng: "2.3522" });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
            expect(mockWeatherService.getWeather).toHaveBeenCalledWith(mockRequest);
        });

        it("should return 400 when no parameters are provided", async () => {
            const response = await request(app).get("/weather");

            expect(response.status).toBe(400);
            expect(response.body.error).toBe(
                "Missing required parameters: either city or lat/lng must be provided",
            );
        });

        it("should return 400 when invalid coordinates are provided", async () => {
            const response = await request(app)
                .get("/weather")
                .query({ lat: "invalid", lng: "2.3522" });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Invalid coordinates format");
        });

        it("should handle errors from weather service", async () => {
            const mockRequest: WeatherRequest = {
                type: "city",
                city: "NonExistentCity",
            };

            mockWeatherService.getWeather = jest
                .fn()
                .mockRejectedValue(new Error('City "NonExistentCity" not found'));

            const response = await request(app)
                .get("/weather")
                .query({ city: "NonExistentCity" });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('City "NonExistentCity" not found');
            expect(mockWeatherService.getWeather).toHaveBeenCalledWith(mockRequest);
        });
    });
});
