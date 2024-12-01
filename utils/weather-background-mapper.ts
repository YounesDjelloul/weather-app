import type {BackgroundMapper} from "~/types/weather";

const appPrefix = process.env.NODE_ENV === 'development' ? '/' : '/weather-app/';

const weatherBackgroundMapper: BackgroundMapper = {
    clear: {
        day: `${appPrefix}images/backgrounds/clear-day.jpg`,
        night: `${appPrefix}images/backgrounds/clear-night.jpg`,
    },
    clouds: {
        day: `${appPrefix}images/backgrounds/cloudy-day.jpg`,
        night: `${appPrefix}images/backgrounds/cloudy-night.jpg`,
    },
    rain: {
        day: `${appPrefix}images/backgrounds/rain-day.jpg`,
        night: `${appPrefix}images/backgrounds/rain-night.jpg`,
    },
    thunderstorm: {
        day: `${appPrefix}images/backgrounds/thunderstorm-day.jpg`,
        night: `${appPrefix}images/backgrounds/thunderstorm-night.jpg`,
    },
    snow: {
        day: `${appPrefix}images/backgrounds/snow-day.jpg`,
        night: `${appPrefix}images/backgrounds/snow-night.jpg`,
    },
    fog: {
        day: `${appPrefix}images/backgrounds/fog-day.jpg`,
        night: `${appPrefix}images/backgrounds/fog-night.jpg`,
    },
    extreme: {
        day: `${appPrefix}images/backgrounds/extreme-day.jpg`,
        night: `${appPrefix}images/backgrounds/extreme-night.jpg`,
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
