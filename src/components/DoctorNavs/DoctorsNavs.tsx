import React from 'react'

const DoctorsNavs: React.FC = () => {
	return (
		<div>
			<section id='doctorNavs'>
				<div className='container'>
					<div className='doctorNavs'>
						<div className='doctorMainNavs'>
							<button>Скидки %</button>
							<button>Cмена</button>
							<button>Детский</button>
							<h3>Сбросить</h3>
						</div>
						<div className='doctorMainSort'></div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default DoctorsNavs
