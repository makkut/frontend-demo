import { useEmployees, useUser } from "@/store/zustand";
import _ from "lodash";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    <>{!_.isEmpty(employee) && <DynamicPDFGenerator employee={employee} />}</>
  );
};

export default PDFPage;
