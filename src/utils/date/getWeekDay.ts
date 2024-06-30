export function getWeekDay(dateString: string): string {
    const date = new Date(dateString);
    const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    return daysOfWeek[date.getDay()];
}
// вернет "сб"
