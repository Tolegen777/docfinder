import React from "react";
import "../infoClinics/info.scss";

type AboutClinicsProps = {
    description: string;
};

const AboutClinics: React.FC<AboutClinicsProps> = ({ description }) => {
    return (
        <div className="about1 mt-[2pc]">
            <div className="container" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    );
};

export default AboutClinics;
