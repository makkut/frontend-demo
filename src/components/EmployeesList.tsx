import EditEmployees from "@/components/EditEmployees";
import NewEmployees from "@/components/NewEmployees";
import ErrorData from "@/components/Error/ErrorData";
import { EmployeeInterface } from "@/interfaces/interfaces";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { GrDocumentPdf } from "react-icons/gr";
import DeleteModal from "@/components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@/store/zustand";
import { useRouter } from "next/router";
import Link from "next/link";
import en from "../../public/locales/en";
import de from "../../public/locales/de";
import { useGetEmployees } from "@/store/useCustomQuery";

const EmployeesList = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : de;
  const logout = useUser((state: any) => state.logout);
  const { data, isError } = useGetEmployees();
  const [isAddNewEmployee, setIsAddNewEmployee] = useState(false);
  const [isEditEmployee, setIsEditEmployee] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState<string | undefined>();

  const handleToast = (isSuccess: boolean) => {
    isSuccess ? toast.success(t.completed) : toast.error(t.error);
  };

  const handleDeleteEmployee = (id: string | undefined) => {
    setIsDeleteModal(true);
    setIdEmployee(id);
  };

  const handleUpdateEmployee = (id: string | undefined) => {
    setIsEditEmployee(true);
    setIdEmployee(id);
  };

  if (isError) {
    return (
      <main className=" flex justify-center mt-[12rem]">
        <div>
          <ErrorData />
        </div>
      </main>
    );
  }
  return (
    <>
      <Head>
        <title>{t.employeeList}</title>
      </Head>
      <main className=" flex justify-center items-center">
        {isAddNewEmployee && (
          <NewEmployees
            setIsModal={setIsAddNewEmployee}
            isEdit={true}
            handleToast={handleToast}
          />
        )}
        {isEditEmployee && (
          <EditEmployees
            setIsModal={setIsEditEmployee}
            isEdit={true}
            id={idEmployee}
            handleToast={handleToast}
          />
        )}

        <div className="text-center pt-[15px]">
          <h1 className="text-2xl font-bold">{t.employeeList}</h1>
          <button
            onClick={() => {
              setIsAddNewEmployee(true);
            }}
            className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] mt-3 duration-500 rounded-[5px] font-bold text-base"
          >
            {t.addEmployee}
          </button>
          <button
            onClick={() => {
              logout();
            }}
            className="text-white bg-gray-400 hover:bg-gray-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base ml-5"
          >
            {t.logout}
          </button>
          <TableContainer className="mt-3">
            {data ? (
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>{t.firstname}</Th>
                    <Th>{t.lastname}</Th>
                    <Th>{t.actions}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((e: EmployeeInterface) => (
                    <Tr key={e._id}>
                      <Td>{e.firstname}</Td>
                      <Td>{e.lastname}</Td>
                      <Td>
                        <div className="flex">
                          <RiEditBoxLine
                            size={23}
                            className="mr-2 cursor-pointer"
                            onClick={() => {
                              handleUpdateEmployee(e._id);
                            }}
                          />
                          <RiDeleteBin6Line
                            className="cursor-pointer"
                            size={23}
                            onClick={() => {
                              handleDeleteEmployee(e._id);
                            }}
                          />
                          <div className="ml-2">
                            <Link
                              href={`/pdf/${e._id}`}
                              rel="noopener noreferrer"
                              target="_blank"
                              passHref
                            >
                              <GrDocumentPdf
                                className="cursor-pointer "
                                size={23}
                              />
                            </Link>
                          </div>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <p className="text-lg">{t.listIsEmpty}</p>
            )}
          </TableContainer>
        </div>
      </main>
      <ToastContainer />
      <DeleteModal
        isDeleteModal={isDeleteModal}
        id={idEmployee}
        setIsDeleteModal={setIsDeleteModal}
        handleToast={handleToast}
      />
    </>
  );
};
export default EmployeesList;
