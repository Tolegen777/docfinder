export function getDayOfMonth(dateString: string): number {
    const date = new Date(dateString);
    return date.getDate();
}
