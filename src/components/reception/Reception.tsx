"use client";

import React, {useMemo, useState} from "react";
import styles from "./reception.module.scss";
import Procedures from "@/components/Procedures/Procedures";
import Clinics from "../Clinics/Clinics";
import {useQuery} from "@tanstack/react-query";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {ISpeciality} from "@/types/specialityTypes";
import {transformSpecData} from "@/utils/transformSpecData";
import SpecsLinkLists from "@/components/SpecsLinkLists/SpecsLinkLists";
import {IGet} from "@/types/common";
import {IClinics} from "@/types/clinicsTypes";
import {IProcedure} from "@/types/procedureTypes";
import {useStateContext} from "@/contexts";

function Reception() {
  const [activeLink, setActiveLink] = useState("Врачи");

  const apiInstance = useCreateAxiosInstance();

  const {state} = useStateContext()

  const {cityId} = state

  const { data, isLoading } = useQuery({
    queryKey: ["specialistsDataList", cityId],
    queryFn: () =>
      apiInstance
        .get<ISpeciality[]>(`patients/specialists-in-city/${cityId}/`)
        .then((response) => response.data),
    refetchOnMount: false,
  });

  const { data: clinics, isLoading: clinicsLoading } = useQuery({
    queryKey: ["clinicsDataList", cityId],
    queryFn: () =>
      apiInstance
        .get<IGet<IClinics>>(`patients/clinic-branches-in-city/${cityId}/`)
        .then((response) => response.data),
    refetchOnMount: false,
  });

  const { data: procs, isLoading: procsLoading } = useQuery({
    queryKey: ["proceduresDataList", cityId],
    queryFn: () =>
      apiInstance
        .get<IProcedure[]>(`patients/procedures-in-city/${cityId}/`)
        .then((response) => response.data),
    refetchOnMount: false,
  });

  const formattedData = useMemo(() => transformSpecData(data ?? []), [data]);

  return (
    <>
      <section className={styles.reception}>
        <div className="container">
          <div className={styles.content}>
            <div className="container">
              <div className={styles.navs}>
                <h1 className={styles.title}>Круглосуточная запись на прием</h1>
                <nav className={styles.nav}>
                  <div
                    className={`${styles.link} ${
                      activeLink === "Врачи" ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink("Врачи")}
                  >
                    Врачи
                  </div>
                  <div
                    className={`${styles.link} ${
                      activeLink === "Процедуры" ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink("Процедуры")}
                  >
                    Процедуры
                  </div>
                  <div
                    className={`${styles.link} ${
                      activeLink === "Клиники" ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink("Клиники")}
                  >
                    Клиники
                  </div>
                </nav>
              </div>
            </div>
            {activeLink === "Врачи" ? (
              <SpecsLinkLists
                formattedData={formattedData}
                isLoading={isLoading}
              />
            ) : activeLink === "Процедуры" ? (
              <Procedures data={procs ?? []} isLoading={procsLoading} />
            ) : (
              <Clinics
                data={clinics?.results ?? []}
                isLoading={clinicsLoading}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Reception;
