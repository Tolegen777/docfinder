import DoctorInformation from '@/components/DoctorInformation/DoctorInformation'
import DoctorsNavs from '@/components/DoctorNavs/DoctorsNavs'
import Quality from '@/components/Quality/Quality'
import Hero from '@/components/hero/Hero'

function Doctor() {
	return (
		<div>
			<Hero />
			<DoctorsNavs />
			<DoctorInformation />
			<Quality />
		</div>
	)
}

export default Doctor
