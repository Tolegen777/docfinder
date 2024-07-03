import Image from "next/image";
import stationar from "@/components/svg/svg/stationar.svg";
import p from "@/components/svg/svg/p.svg";
import card from "@/components/svg/svg/card.svg";
import diarnostic from "@/components/svg/svg/diagnostic.svg";
import analiz from "@/components/svg/svg/analiz.svg";
import deti from "@/components/svg/svg/deti.svg";
import time from "@/components/svg/svg/24/7.svg";
import plashadka from "@/components/svg/svg/plashadka.svg";
import wifi from "@/components/svg/svg/wifi.svg";
import apteka from "@/components/svg/svg/anpeta.svg";
import './info.scss'
const data = [
  { text: "Есть стационар", icon: stationar },
  { text: "Есть парковка", icon: p },
  { text: "Проводим диагностику", icon: diarnostic },
  { text: "Прием анализов", icon: analiz },
  { text: "Детская игровая зона", icon: plashadka },
  { text: "Принимаем Карточки", icon: card },
  { text: "Аптека на территории", icon: apteka },
  { text: "Принимаем детей", icon: deti },
  { text: "Круглосуточно", icon: time },
  { text: "Бесплатный Wi-Fi", icon: wifi },
];

function InfoClinics() {
  return (
    <div style={{background:'white'}} className="info">
      <div className="container">
        <div className="info__content flex flex-wrap gap-[25px] justify-center ">
          {data.map((el) => (
            <div className="info__content__block max-w-[350px] flex gap-[20px] items-center mb-[20px]">
              <div className="w-[48px] h-[44px]">
                <Image
                  src={el.icon}
                  alt="svg docFinger"
                  width={48}
                  height={44}
                />
              </div>
              <p className="text-[24px] font-normal">{el.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoClinics;
