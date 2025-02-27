import axios, { AxiosError } from "axios";
import { WeatherService } from "./weatherService";
import { WeatherRequest } from "../types/weather";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeatherService", () => {
    const config = {
        apiKey: "test-api-key",
        baseUrl: "https://api.openweathermap.org/data/2.5",
    };

    const service = new WeatherService(config);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getWeather", () => {
        it("should fetch weather data by city", async () => {
            const request: WeatherRequest = {
                type: "city",
                city: "Paris",
            };

            const mockApiResponse = {
                data: {
                    main: {
                        temp: 15.5,
                        humidity: 82,
                    },
                    weather: [
                        {
                            description: "Ciel partiellement nuageux",
                        },
                    ],
                    name: "Paris",
                },
            };

            mockedAxios.get.mockResolvedValue(mockApiResponse);

            const result = await service.getWeather(request);

            expect(mockedAxios.get).toHaveBeenCalledWith(`${config.baseUrl}/weather`, {
                params: {
                    q: "Paris",
                    appid: config.apiKey,
                    units: "metric",
                    lang: "fr",
                },
            });

            expect(result).toEqual({
                city: "Paris",
                temperature: 16,
                humidity: 82,
                description: "Ciel partiellement nuageux",
            });
        });

        it("should fetch weather data by coordinates", async () => {
            const request: WeatherRequest = {
                type: "coordinates",
                latitude: 48.8566,
                longitude: 2.3522,
            };

            const mockApiResponse = {
                data: {
                    main: {
                        temp: 15.5,
                        humidity: 82,
                    },
                    weather: [
                        {
                            description: "Ciel partiellement nuageux",
                        },
                    ],
                    coord: {
                        lat: 48.8566,
                        lon: 2.3522,
                    },
                },
            };

            mockedAxios.get.mockResolvedValue(mockApiResponse);

            const result = await service.getWeather(request);

            expect(mockedAxios.get).toHaveBeenCalledWith(`${config.baseUrl}/weather`, {
                params: {
                    lat: 48.8566,
                    lon: 2.3522,
                    appid: config.apiKey,
                    units: "metric",
                    lang: "fr",
                },
            });

            expect(result).toEqual({
                latitude: 48.8566,
                longitude: 2.3522,
                temperature: 16,
                humidity: 82,
                description: "Ciel partiellement nuageux",
            });
        });

        it("should handle API errors", async () => {
            const request: WeatherRequest = {
                type: "city",
                city: "NonExistentCity",
            };

            const mockError = {
                isAxiosError: true,
                response: {
                    status: 404,
                    data: { message: "City not found" },
                    statusText: "Not Found",
                    headers: {},
                    config: {},
                },
            } as AxiosError;

            mockedAxios.get.mockRejectedValue(mockError);

            await expect(service.getWeather(request)).rejects.toThrow(
                'City "NonExistentCity" not found',
            );
        });

        it("should handle unexpected errors", async () => {
            const request: WeatherRequest = {
                type: "city",
                city: "Paris",
            };

            const mockError = new Error("Network error");
            mockedAxios.get.mockRejectedValue(mockError);

            await expect(service.getWeather(request)).rejects.toThrow("Network error");
        });
    });
});
