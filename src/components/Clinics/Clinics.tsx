import React from "react";
import styles from "./Clinics.module.scss";
import Image from "next/image";
import { IClinics } from "@/types/clinicsTypes";
import { ClinicsSkeleton } from "@/components/shared/skeleton/ClinicsSkeleton";
import {getRussianShortDayOfWeek} from "@/utils/date/getRussianDayOfWeek";
import {formatTime} from "@/utils/date/formatTime";

type Props = {
  data: IClinics[];
  isLoading: boolean;
};

const Clinics = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return <ClinicsSkeleton />;
  }

  return (
    <div>
      {data?.map((item) => (
        <section key={item?.id} id={styles.clinics}>
          <div className="container">
            <div className={styles.clinics}>
              <div className={styles.clinicsBlock}>
                <div className={styles.clinicsImg}>
                  <Image
                    height={100}
                    width={100}
                    src={item?.photo_url}
                    alt=""
                    className={styles.clinicsImg1}
                  />
                  <h3 className={styles.clinicsImgH3}>★ ★ ★ ★ ★</h3>
                  <h4 className={styles.clinicsImgH4}>
                    {item?.reviews_count} отзвыов
                  </h4>
                </div>
                <div className={styles.clinicsText}>
                  <h3 className={styles.clicicsTextH3}>
                    {item?.franchise_title}
                  </h3>
                  <h4 className={styles.clicicsTextH5}>{item?.title}</h4>
                  <p className={styles.clicicsTextP}>{item?.description}</p>
                </div>
                <div className={styles.clinicsEnd}>
                  <h4>{item?.address}</h4>
                  {/*<p className={styles.clincsEndP}>*/}
                  {/*  Тастак-3 м-н, Алмалинский район, Алматы, 050009/A05G6F2*/}
                  {/*</p>*/}
                  <div className={styles.clinicsEndFlexMain}>
                    {item?.working_hours?.map((hour, index) => <div key={hour?.day_of_week + index} className={styles.clinicsEndFlex}>
                      <h5>{getRussianShortDayOfWeek(hour?.day_of_week)}</h5>
                      <h5>{formatTime(hour?.open_time)} - {formatTime(hour?.close_time)}</h5>
                    </div>)}
                  </div>
                  {/*<button className={styles.clinicsButton}>*/}
                  {/*  Записаться в клинику*/}
                  {/*</button>*/}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Clinics;
