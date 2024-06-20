"use client";

import React, { useState } from "react";
import DoctorInformation from "@/components/DoctorInformation/DoctorInformation";
import DoctorsNavs from "@/components/DoctorNavs/DoctorsNavs";
import Quality from "@/components/Quality/Quality";
import Hero from "@/components/hero/Hero";

function Doctor() {
  const [modal, setModal] = useState<boolean>(false);

  function toggleModal() {
    setModal((prevModal) => !prevModal);
  }

  return (
    <div>
      <Hero />
      <DoctorsNavs />
      <DoctorInformation modalFunction={toggleModal} />
      <Quality />
    </div>
  );
}

export default Doctor;
