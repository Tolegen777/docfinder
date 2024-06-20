import React, { useState } from "react";
import styles from "./HeaderModal.module.scss";
import headericon1 from "../svg/headericon1.svg";
import headericon2 from "../svg/headericon2.svg";
import Image from "next/image";
type DoctorModalProps = Partial<{
  img: string;
  name: string;
  description: string;
  setModal: () => void;
}>;

const HeaderModal: React.FC<DoctorModalProps> = ({
  img,
  name,
  description,
  setModal,
}) => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = () => {
    alert(`Запись успешно отправлена. Имя: ${patientName}, Телефон: ${phone}`);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={setModal}>
          ×
        </button>
        <h4></h4>
        <h2 className={styles.doctorName}>Войти в профиль пользователя</h2>
        <p className={styles.doctorDescription}>{description}</p>
        <input
          type="text"
          className={styles.input}
          placeholder="Ваш телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <h6 className={styles.doctorP}>
          На указанный вами номер будет отправлено SMS с кодом подтверждения
        </h6>
        <button className={styles.closeButton1}>
          <Image src={headericon1} width={20} height={20} alt="" /> Войти по
          DocFinderID
        </button>
        <button className={styles.closeButton2}>
          <Image src={headericon2} width={20} height={20} alt="" />
          Войти через EgovKz
        </button>
        <button className={styles.bookButton} onClick={handleBooking}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default HeaderModal;
