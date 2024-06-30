export function getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // добавляем 1 и форматируем с ведущим нулем
    const day = date.getDate().toString().padStart(2, '0'); // форматируем с ведущим нулем
    return `${year}-${month}-${day}`;
}
// вернет текущую дату в формате 2024-06-29
