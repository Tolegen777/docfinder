"use client";

import React, {useEffect, useMemo, useState} from "react";
import styles from "./reception.module.scss";
import Procedures from "@/components/Procedures/Procedures";
import Clinics from "@/components/Clinics/Clinics";
import {useQuery} from "@tanstack/react-query";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {ISpeciality} from "@/types/specialityTypes";
import {transformSpecData} from "@/utils/transformSpecData";
import SpecsLinkLists from "@/components/SpecsLinkLists/SpecsLinkLists";
import {IGet} from "@/types/common";
import {IClinics} from "@/types/clinicsTypes";
import {IProcedure} from "@/types/procedureTypes";
import {useStateContext} from "@/contexts";
import CustomPagination from "@/components/shared/CustomPagination";

const linkOptions = [
  { title: "Врачи", code: "doctors" },
  { title: "Процедуры", code: "procedures" },
  { title: "Клиники", code: "clinics" },
];

function Reception() {
  const apiInstance = useCreateAxiosInstance();
  const { state } = useStateContext();
  const { cityId } = state;
  const [page, setPage] = useState(1);

  const getStoredActiveLink = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("activeLink") || "Врачи";
    }
    return "Врачи";
  };

  const [activeLink, setActiveLink] = useState<string>(getStoredActiveLink());

  useEffect(() => {
    sessionStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["specialistsDataList", cityId],
    queryFn: () =>
        apiInstance
            .get<ISpeciality[]>(`patients/specialists-in-city/${cityId}/`)
            .then((response) => response.data),
    refetchOnMount: false,
    enabled: cityId?.length > 0,
  });

  const { data: clinics, isLoading: clinicsLoading } = useQuery({
    queryKey: ["clinicsDataList", cityId, page],
    queryFn: () =>
        apiInstance
            .get<IGet<IClinics>>(`patients/clinic-branches-in-city/${cityId}/?page=${page}`)
            .then((response) => response.data),
    refetchOnMount: false,
    enabled: cityId?.length > 0,
  });

  const { data: procs, isLoading: procsLoading } = useQuery({
    queryKey: ["proceduresDataList", cityId],
    queryFn: () =>
        apiInstance
            .get<IProcedure[]>(`patients/procedures-in-city/${cityId}/`)
            .then((response) => response.data),
    refetchOnMount: false,
    enabled: cityId?.length > 0,
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
                    {linkOptions.map((link) => (
                        <div
                            key={link.code}
                            className={`${styles.link} ${
                                activeLink === link.title ? styles.active : ""
                            }`}
                            onClick={() => handleLinkClick(link.title)}
                        >
                          {link.title}
                        </div>
                    ))}
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
                  <>
                    <Clinics
                        data={clinics?.results ?? []}
                        isLoading={clinicsLoading}
                    />
                    <CustomPagination setPage={setPage} totalCount={clinics?.count ?? 0} />
                  </>
              )}
            </div>
          </div>
        </section>
      </>
  );
}

export default Reception;
