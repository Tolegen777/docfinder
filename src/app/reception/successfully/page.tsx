import dynamic from "next/dynamic";
const SuccessfullyCom = dynamic(() => import('@/components/Successfully/SuccessfullyCom'));

const Successfully = () => {
	return (
		<div>
			<SuccessfullyCom />
		</div>
	)
}

export default Successfully
