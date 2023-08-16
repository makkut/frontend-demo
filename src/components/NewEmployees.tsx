import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalEmployee from "./ModalEmployee";
import EmployeeService from "@/services/EmployeeService";
import {
  EmployeeInterface,
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";

const NewEmployees: FC<EmployeesProps> = ({
  setIsModal,
  isEdit,
  handleToast,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (body: EmployeeInterface) => EmployeeService.addEmployee(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      mutate({
        firstname: values.firstname,
        lastname: values.lastname,
        birthdate: values.birthdate.split("-").reverse().join("."),
        phone: values.phone,
        address: {
          city: values.city,
          zip: String(values.zip),
          street: values.street,
          number: values.number,
        },
      } as EmployeeInterface);
      handleToast(true);
      setIsModal(false);
    } catch (error) {
      handleToast(false);
    }
  };
  const initialValues = {
    firstname: "",
    lastname: "",
    birthdate: "",
    phone: "",
    city: "",
    zip: "",
    street: "",
    number: "",
  };
  return (
    <div className="flex justify-center ">
      <ModalEmployee
        setIsModal={setIsModal}
        isEdit={isEdit}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};
export default NewEmployees;
