import DoctorInformation from '@/components/DoctorInformation/DoctorInformation'
import DoctorsNavs from "@/components/DoctorNavs/DoctorsNavs";
import Hero from '@/components/hero/Hero'
import React from "react";

function Doctor() {
  return (
    <div>
      <Hero/>
      <DoctorsNavs />
      <DoctorInformation/>
    </div>
  );
}

export default Doctor;
