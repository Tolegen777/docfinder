import p from "@/components/svg/svg/p.svg";
import './info.scss'
import {ListOfAmenity} from "@/types/clinicsTypes";

type Props = {
  data: ListOfAmenity[]
}

function InfoClinics({data}: Props) {
  return (
    <div style={{background:'white'}} className="info">
      <div className="container">
        <div className="info__content flex flex-wrap gap-[25px] justify-center ">
          {data.map((el) => (
            <div key={el?.id} className="info__content__block max-w-[350px] flex gap-[20px] items-center mb-[20px]">
              {/*<div className="w-[48px] h-[44px]">*/}
              {/*  <Image*/}
              {/*    src={el.icon}*/}
              {/*    alt="svg docFinger"*/}
              {/*    width={48}*/}
              {/*    height={44}*/}
              {/*  />*/}
              {/*</div>*/}
              <p className="text-[24px] font-normal">{el.amenity_title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoClinics;
