import React from "react";
import type { Company } from "../tyeps";

//변하지 않는 페이지이므로, SSG
//companyInfo 정보를 불러와서 회사에 대한 소개를 구현하는 페이지
const AboutPage = async () => {
  const response = await fetch("http://localhost:4000/companyInfo", {
    cache: "force-cache",
  });
  const results = await response.json();

  const companyInfo: Company = results;
  return (
    <div>
      {companyInfo.name}
      {companyInfo.desctiption}
      <img src={companyInfo.image} />
    </div>
  );
};

export default AboutPage;
