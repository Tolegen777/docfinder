import moment from 'moment';
import 'moment/locale/ru';
import dayjs from "dayjs";

type Props = {
    inputDate?: string,
    inputTime?: string,
    isoDateTime?: string
}

export function formatDateTime({inputDate, inputTime, isoDateTime}: Props): string {
    const now = moment();
    let dateMoment, timeMoment;

    if (isoDateTime) {
        const isoMoment = moment(isoDateTime);
        if (!isoMoment.isValid()) {
            return 'Invalid ISO date-time';
        }
        dateMoment = isoMoment;
        timeMoment = isoMoment;
    } else {
        dateMoment = moment(inputDate);
        timeMoment = moment(inputTime, 'HH:mm:ss');
    }

    if (!dateMoment.isValid() || !timeMoment.isValid()) {
        return 'Invalid date or time';
    }

    if (dateMoment.isSame(now, 'day')) {
        return `Сегодня, ${timeMoment.format('HH:mm')}`;
    }

    return `${dateMoment.format('DD.MM.YYYY')}, ${timeMoment.format('HH:mm')}`;
}
