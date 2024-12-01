import type {BackgroundMapper} from "~/types/weather";

const config = useRuntimeConfig();

const weatherBackgroundMapper: BackgroundMapper = {
    clear: {
        day: `${config.app.baseURL}images/backgrounds/clear-day.jpg`,
        night: `${config.app.baseURL}images/backgrounds/clear-night.jpg`,
    },
    clouds: {
        day: `${config.app.baseURL}images/backgrounds/cloudy-day.jpg`,
        night: `${config.app.baseURL}images/backgrounds/cloudy-night.jpg`,
    },
    rain: {
        day: "/images/backgrounds/rain-day.jpg",
        night: "/images/backgrounds/rain-night.jpg",
    },
    thunderstorm: {
        day: "/images/backgrounds/thunderstorm-day.jpg",
        night: "/images/backgrounds/thunderstorm-night.jpg",
    },
    snow: {
        day: "/images/backgrounds/snow-day.jpg",
        night: "/images/backgrounds/snow-night.jpg",
    },
    fog: {
        day: "/images/backgrounds/fog-day.jpg",
        night: "/images/backgrounds/fog-night.jpg",
    },
    extreme: {
        day: "/images/backgrounds/extreme-day.jpg",
        night: "/images/backgrounds/extreme-night.jpg",
    }
};

const mapWeatherConditionToCategory = (condition: string): string => {
    if (condition.includes("rain") || condition.includes("drizzle")) {
        return "rain";
    }
    if (condition.includes("cloud")) {
        return "clouds";
    }
    if (condition.includes("clear")) {
        return "clear";
    }
    if (condition.includes("thunderstorm")) {
        return "thunderstorm";
    }
    if (condition.includes("snow")) {
        return "snow";
    }
    if (
        condition.includes("mist") ||
        condition.includes("fog") ||
        condition.includes("haze") ||
        condition.includes("smoke")
    ) {
        return "fog";
    }
    if (
        condition.includes("tornado") ||
        condition.includes("hurricane") ||
        condition.includes("squall")
    ) {
        return "extreme";
    }
    return "clear"; // Default fallback
};

export const getBackgroundImage = (
    condition: string,
    isDaytime: boolean
): string => {
    const category = mapWeatherConditionToCategory(condition.toLowerCase());
    return isDaytime
        ? weatherBackgroundMapper[category].day
        : weatherBackgroundMapper[category].night;
};
