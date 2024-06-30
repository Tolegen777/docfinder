export function formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}
 // вернет "12:30"
