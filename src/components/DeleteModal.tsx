import { DeleteModalProps } from "@/interfaces/interfaces";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import en from "../../public/locales/en";
import de from "../../public/locales/de";
import EmployeeService from "@/services/EmployeeService";

const DeleteModal: FC<DeleteModalProps> = ({
  id,
  isDeleteModal,
  setIsDeleteModal,
  handleToast,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : de;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string | undefined) => EmployeeService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return (
    <>
      <Modal
        isOpen={isDeleteModal}
        onClose={() => {
          setIsDeleteModal(false);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>{t.deleteMessage}</ModalHeader>
          <ModalBody>
            <div className="flex justify-center pb-4">
              <button
                onClick={async () => {
                  try {
                    await mutate(id);
                    setIsDeleteModal(false);
                    handleToast(true);
                  } catch (error) {
                    handleToast(false);
                  }
                }}
                className="text-white bg-red-600 hover:bg-red-500 px-[50px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base mr-10"
              >
                {t.delete}
              </button>
              <button
                onClick={() => {
                  setIsDeleteModal(false);
                }}
                className="text-white bg-gray-400 hover:bg-gray-500 px-[50px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
              >
                {t.cancel}
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
