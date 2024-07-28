import {PartnerSegmentsCreateUpdaterForm} from "@/components/Profile/ProfileUpdateForm/ProfileUpdateForm";
import PatientVisits from "@/components/Profile/PatientVisits/PatientVisits";

export default function Profile() {
  return (
    <div>
        <PartnerSegmentsCreateUpdaterForm/>
        <PatientVisits/>
    </div>
  );
}
