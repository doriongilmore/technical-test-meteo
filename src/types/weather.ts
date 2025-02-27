// Request types
export type WeatherRequest = WeatherByCityRequest | WeatherByCoordinatesRequest;

export interface WeatherByCityRequest {
    type: "city";
    city: string;
}

export interface WeatherByCoordinatesRequest {
    type: "coordinates";
    latitude: number;
    longitude: number;
}

// Common weather data
export interface WeatherData {
    temperature: number;
    humidity: number;
    description: string;
}

// Response type combines weather data with location info from the request
export type WeatherResponse = WeatherData &
    (Omit<WeatherByCityRequest, "type"> | Omit<WeatherByCoordinatesRequest, "type">);

export interface WeatherServiceConfig {
    apiKey: string;
    baseUrl: string;
}
