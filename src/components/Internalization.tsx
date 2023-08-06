import { DE, GB } from "country-flag-icons/react/3x2";
import router from "next/router";

const Internationalization = () => {
  return (
    <div className="flex justify-end mt-5">
      <div
        className="flex justify-center mr-5 cursor-pointer"
        onClick={() => {
          router.push("/", "/", { locale: "de" });
        }}
      >
        <DE title="Deutsch" className="w-5 mr-1" />
        DE
      </div>
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => {
          router.push("/", "/", { locale: "en" });
        }}
      >
        <GB title="Englisch" className="w-5 mr-1" />
        EN
      </div>
    </div>
  );
};

export default Internationalization;
