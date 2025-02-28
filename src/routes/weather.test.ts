import { createApp } from "../app";

jest.mock("../config", () => ({
    config: {
        port: 7000,
        weather: {
            apiKey: "",
            baseUrl: "https://api.openweathermap.org/data/2.5",
        },
    },
}));

describe("Weather Router", () => {
    describe("GET /weather", () => {
        it("should throw an error if WEATHER_API_KEY has default empty value", async () => {
            expect(createApp).toThrow("WEATHER_API_KEY environment variable is required");
        });
    });
});
