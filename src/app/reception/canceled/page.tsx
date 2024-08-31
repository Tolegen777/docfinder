import dynamic from "next/dynamic";
const CanceledCom = dynamic(() => import('@/components/Canceled/CanceledCom'));

const Canceled = () => {
	return (
		<div>
			<CanceledCom />
		</div>
	)
}

export default Canceled
