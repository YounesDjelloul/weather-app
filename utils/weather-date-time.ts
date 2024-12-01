export function isDaytime(timezoneOffsetInSeconds: number): boolean {
    const now = new Date();
    const localDate = new Date(now.getTime() + timezoneOffsetInSeconds * 1000);

    const localHour = localDate.getUTCHours();

    return localHour >= 6 && localHour < 18;
}

export function getLocalTime(timezoneOffsetInSeconds: number): string {
    const now = new Date();
    const localDate = new Date(now.getTime() + timezoneOffsetInSeconds * 1000);

    return localDate.toLocaleTimeString('en-US',
        {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'}
    );
}

export function formatDateWithTimezone(timezoneOffsetInSeconds: number): string {
    const now = new Date();
    const localDate = new Date(now.getTime() + timezoneOffsetInSeconds * 1000);
    return localDate.toLocaleString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    });
}