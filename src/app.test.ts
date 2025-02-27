import request from "supertest";
import { createApp } from "./app";

// Mock the config module
jest.mock("./config", () => ({
    config: {
        port: 7000,
        weather: {
            apiKey: "test-api-key",
            baseUrl: "https://api.openweathermap.org/data/2.5",
        },
    },
}));

describe("App", () => {
    const app = createApp();

    it("should handle 404 routes", async () => {
        const response = await request(app).get("/non-existent-route");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Not found" });
    });
});
