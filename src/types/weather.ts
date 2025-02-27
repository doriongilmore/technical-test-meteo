export interface WeatherByCity {
    city: string;
    temperature: number;
    humidity: number;
    description: string;
}

export interface WeatherByCoordinates {
    latitude: number;
    longitude: number;
    temperature: number;
    humidity: number;
    description: string;
}

export interface WeatherServiceConfig {
    apiKey: string;
    baseUrl: string;
}
