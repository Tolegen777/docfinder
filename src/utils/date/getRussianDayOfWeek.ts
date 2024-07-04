export function getRussianShortDayOfWeek(day: string): string {
    const daysOfWeek: { [key: string]: string } = {
        MONDAY: 'пн',
        TUESDAY: 'вт',
        WEDNESDAY: 'ср',
        THURSDAY: 'чт',
        FRIDAY: 'пт',
        SATURDAY: 'сб',
        SUNDAY: 'вс'
    };

    return daysOfWeek[day.toUpperCase()] || 'Некорректный день недели';
}
// Пример использования:
// console.log(getRussianDayOfWeek('MONDAY')); // пн
