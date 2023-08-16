import { FC } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EmployeeInterface,
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";
import _ from "lodash";
import { useGetEmployee } from "@/store/useCustomQuery";
import EmployeeService from "@/services/EmployeeService";
import ModalEmployee from "./ModalEmployee";

const DynamicSpinner = dynamic(() => import("../components/Spinner"), {
  ssr: false,
});

const Employees: FC<EmployeesProps> = ({
  setIsModal,
  id,
  isEdit,
  handleToast,
}) => {
  const queryClient = useQueryClient();

  const { data } = useGetEmployee(id);
  const { mutate } = useMutation({
    mutationFn: (body: EmployeeInterface) =>
      EmployeeService.updateEmployee(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      mutate({
        _id: id,
        firstname: values.firstname,
        lastname: values.lastname,
        birthdate: values.birthdate.split("-").reverse().join("."),
        phone: values.phone,
        address: {
          city: values.city,
          zip: values.zip,
          street: values.street,
          number: values.number,
        },
      });
      setIsModal(false);
      handleToast(true);
    } catch (error) {
      handleToast(false);
    }
  };

  return (
    <>
      {!_.isEmpty(data) ? (
        <div className="flex justify-center ">
          <ModalEmployee
            setIsModal={setIsModal}
            isEdit={isEdit}
            onSubmit={onSubmit}
            initialValues={{
              firstname: data.firstname,
              lastname: data.lastname,
              phone: data.phone,
              birthdate: data.birthdate.split(".").reverse().join("-"),
              city: data.address.city,
              zip: data.address.zip,
              street: data.address.street,
              number: data.address.number,
            }}
          />
        </div>
      ) : (
        <DynamicSpinner />
      )}
    </>
  );
};
export default Employees;
