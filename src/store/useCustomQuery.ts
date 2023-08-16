import EmployeeService from "@/services/EmployeeService";
import { useQuery } from "@tanstack/react-query";

const useGetEmployees = () => {
  return useQuery(["employees"], async () => {
    try {
      const response = await EmployeeService.fetchEmployees();
      return response.data;
    } catch (e) {
      console.log("Error");
    }
  });
};

const useGetEmployee = (id: string | undefined) => {
  return useQuery(["employee", id], async () => {
    try {
      const response = await EmployeeService.fetchEmployee(id);
      return response.data;
    } catch (e) {
      console.log("Error");
    }
  });
};

export { useGetEmployees, useGetEmployee };
