import { useEmployees } from "@/store/zustand";
import _ from "lodash";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import en from "../../../public/locales/en";
import de from "../../../public/locales/de";

const DynamicPDFGenerator = dynamic(
  () => import("../../components/PDFGenerator"),
  {
    ssr: false,
  }
);

const DynamicSpinner = dynamic(() => import("../../components/Spinner"), {
  ssr: false,
});

const PDFPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : de;
  const { getEmployee, employee, isLoading } = useEmployees(
    (state: any) => state
  );
  useEffect(() => {
    getEmployee(router.query.id);
  }, [router.query.id]);

  if (isLoading) {
    return (
      <div className=" flex justify-center mt-[12rem] z-50">
        <DynamicSpinner />
      </div>
    );
  }

  return (
    <>
      {!_.isEmpty(employee) ? (
        <DynamicPDFGenerator employee={employee} />
      ) : (
        <div className="flex justify-center text-center">
          <div>
            <h1 className="text-2xl font-bold pt-6">{t.notAuth}</h1>
            <button
              onClick={() => {
                router.push("/");
              }}
              className="text-white bg-gray-400 hover:bg-gray-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
            >
              {t.back}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PDFPage;
