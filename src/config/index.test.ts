import { AppConfig } from "./index";

describe("Config", () => {
    const originalEnv = process.env;
    let config: AppConfig;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
        // Mocking process.env properties
        process.env.WEATHER_API_KEY = "test-api-key";
        process.env.PORT = "3000";
    });

    afterAll(() => {
        process.env = originalEnv;
        config = require("./index").config;
    });

    it("should load configuration from environment variables", () => {
        config = require("./index").config;

        expect(config).toEqual({
            port: 3000,
            weather: {
                apiKey: "test-api-key",
                baseUrl: "https://api.openweathermap.org/data/2.5",
            },
        });
    });

    it("should use default port when PORT is not set", () => {
        delete process.env.PORT;
        config = require("./index").config;

        expect(config.port).toBe(7000);
    });

    it("should use default empty key when WEATHER_API_KEY is not set", () => {
        delete process.env.WEATHER_API_KEY;
        config = require("./index").config;

        expect(config.weather.apiKey).toBe("");
    });
});
