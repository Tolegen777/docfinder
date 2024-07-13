import dayjs from 'dayjs';

export const datePickerFormatter = (
    date: string | number,
    format = 'YYYY-MM-DD'
): dayjs.Dayjs => dayjs(date, format);
