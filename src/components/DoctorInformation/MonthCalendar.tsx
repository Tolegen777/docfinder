import { addDays, format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarInput.css';

type CalendarInputProps = {
	date: Date;  
};

const CalendarInput = ({ date }: CalendarInputProps) => {
	const [startDate, setStartDate] = useState<Date>(date); 
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	const handleDateChange = (date: Date | null) => {
		if (date) {
			setStartDate(date); 
			setIsOpen(false);  
		}
	};

	return (
		<div>
			<button onClick={handleClick}>
				<h2>{format(startDate, 'LLLL', { locale: ru })}</h2>
			</button>
			{isOpen && (
				<div className='divClock'>
					<DatePicker
						selected={startDate}
						onChange={(date) => handleDateChange(date as Date)} 
						locale={ru}
						dateFormat='dd.MM.yyyy'
						minDate={subDays(new Date(), 30)}
						maxDate={addDays(new Date(), 30)}
						inline
					/>
				</div>
			)}
		</div>
	);
};

export default CalendarInput;
