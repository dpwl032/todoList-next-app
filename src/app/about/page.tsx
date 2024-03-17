import type { Company } from "../tyeps";

//변하지 않는 페이지이므로, SSG
//companyInfo 정보를 불러와서 회사에 대한 소개를 구현하는 페이지

//async : 서버 컴포넌트
const AboutPage = async () => {
  const response = await fetch("http://localhost:4000/companyInfo", {
    cache: "force-cache",
  });

  const companyInfo: Company = await response.json();
  return (
    <div>
      {companyInfo.name}
      {companyInfo.description}
      <img src={companyInfo.image} />
    </div>
  );
};

export default AboutPage;
