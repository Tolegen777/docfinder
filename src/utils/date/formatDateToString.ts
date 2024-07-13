import moment from 'moment';
export const formatDateToString = (date: Date | string | number | null, format = 'YYYY-MM-DD') => {
    if (!date) {
        return undefined;
    }

    return moment(date).format(format);
};

// Пример использования
// Output: Date => '2024-07-13'

