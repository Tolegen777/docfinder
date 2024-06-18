"use client"
import React, { useState } from "react";
import DoctorInformation from "@/components/DoctorInformation/DoctorInformation";
import DoctorModal from "@/components/DoctorModal/DoctorModal";
import Specializations from "@/components/Specializations/Specializations";

// Define Page component as a function component
const Page: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);

  const modalFunction = (): void => {
    setModal((prevModal) => !prevModal);
  };

  return (
    <div>
      <div
        style={{
          background: "white",
          width: "100%",
        }}
      >
        <div>
          <DoctorInformation modalFunction={modalFunction} />
        </div>
        <Specializations />
      </div>
      <div
        style={{
          display: modal ? "block" : "none",
        }}
      >
        <DoctorModal setModal={modalFunction} />
      </div>
    </div>
  );
};

export default Page;