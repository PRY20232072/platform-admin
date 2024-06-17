"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import msgraphService from "@/services/msgraphService";
import { toast } from "react-toastify";
require("dotenv").config();
interface PractitionerProps {
  practitioner: any;
  FormModalClose: () => void;
  formIsValid: boolean;
}

const ConfirmModal: React.FC<PractitionerProps> = ({
  practitioner,
  FormModalClose,
  formIsValid,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [practitionerList, setPractitionerList] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await msgraphService.getPractitionerList();

        if (data && data.value.length > 0) {
          const updatedList = data.value.map((practitioner: any) => ({
            name_id: practitioner.displayName,
            email: practitioner.identities[0].issuerAssignedId,
            user_id: practitioner.id ? practitioner.id : "N/A",
          }));
          setPractitionerList(updatedList);
        } else {
          setPractitionerList([]);
        }
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      }
    };

    fetchData();
  }, []);

  const emailExists = (email: string) => {
    return practitionerList.some(
      (practitioner: any) => practitioner.email.toLowerCase() === email.toLowerCase()
    );
  };

  const handleCreate = () => {
    const provIndentity = `${practitioner.displayName
      .replace(/\s+/g, "")
      .toLowerCase()}@${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com`;

    const updatedIdentities = [
      ...practitioner.identities.slice(0, 1),
      {
        signInType: "userPrincipalName",
        issuer: `${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com`,
        issuerAssignedId: provIndentity,
      },
    ];
    const practitionerData = {
      ...practitioner,
      identities: updatedIdentities,
      userPrincipalName: provIndentity,
    };
    if (emailExists(practitionerData.identities[0].issuerAssignedId)) {
      toast.error("Un usuario con este correo electrónico ya existe.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      onClose();
      return;
    }
    msgraphService
      .createUser(practitionerData)
      .then(() => {
        toast.info("Profesional de la salud creado exitosamente!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(`Error al crear el profesional de la salud.`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      });
    onClose();
    FormModalClose();
  };

  return (
    <>
      <Button
        onPress={() => {
          if (formIsValid) {
            onOpen();
          }
        }}
        color='primary'
        variant='flat'
      >
        Continuar
      </Button>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='w-[700px] max-w-full'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Confirmar creación del profesional de la salud
              </ModalHeader>
              <ModalBody>
                <div>¿Estas seguro que quieres continuar?</div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onClick={handleCreate}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const PractitionerModal = () => {
  const [practitioner, setPractitioner] = useState<any>({
    identities: [
      {
        signInType: "",
        issuer: "",
        issuerAssignedId: "",
      },
    ],
    passwordProfile: {
      password: "",
      forceChangePasswordNextSignIn: false,
    },
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [errors, setErrors] = useState<any>({
    displayName: "El nombre de usuario es requerido",
    givenName: "El nombre completo es requerido",
    issuerAssignedId: "El correo electrónico es requerido",
    password: "La contraseña es requerida",
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setPractitioner({
      accountEnabled: true,
      displayName: "",
      givenName: "",
      passwordPolicies: "DisablePasswordExpiration",
      passwordProfile: {
        password: "",
        forceChangePasswordNextSignIn: false,
      },
      userPrincipalName: "",
      userType: "Member",
      [`extension_${process.env.EXTENSION_APP_CLIENT_ID}_UserRole`]: "practitioner",
      [`extension_${process.env.EXTENSION_APP_CLIENT_ID}_PhoneNumber`]: "",
      identities: [
        {
          signInType: "emailAddress",
          issuer: `${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com`,
          issuerAssignedId: "",
        },
        {
          signInType: "userPrincipalName",
          issuer: `${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com`,
          issuerAssignedId: "",
        },
      ],
    });
  }, []);
  useEffect(() => {
    validateForm();
  }, [practitioner]);
  const validateForm = () => {
    let valid = true;
    const errors = {} as any;

    if (!practitioner.displayName) {
      errors.displayName = "Nombre de usuario requerido";
      valid = false;
    }

    if (!practitioner.givenName) {
      errors.givenName = "Nombre completo requerido";
      valid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!practitioner.identities[0].issuerAssignedId) {
      errors.issuerAssignedId = "Correo electrónico requerido";
      valid = false;
    } else if (!emailRegex.test(practitioner.identities[0].issuerAssignedId)) {
      errors.issuerAssignedId = "El correo electrónico no es válido";
      valid = false;
    }

    const pwd = practitioner.passwordProfile.password;
    if (!pwd) {
      errors.password = "Contraseña requerida";
      valid = false;
    } else {
      const validations = [
        {
          regex: /[a-z]/,
          message: "una letra minúscula",
        },
        {
          regex: /[A-Z]/,
          message: "una letra mayúscula",
        },
        { regex: /\d/, message: "un número" },
        {
          regex: /[\W_]/,
          message: "un símbolo (como @, $, etc.)",
        },
      ];

      const passValidations = validations.filter((validation) =>
        validation.regex.test(pwd)
      );
      if (pwd.length < 8 || pwd.length > 64) {
        errors.password = "La contraseña debe tener entre 8 y 64 caracteres.";
        valid = false;
      } else if (passValidations.length < validations.length) {
        const failedConditions = validations.filter(
          (validation) => !validation.regex.test(pwd)
        );
        errors.password =
          "La contraseña debe incluir al menos " +
          failedConditions.map((v) => v.message).join(", ") +
          ".";
        valid = false;
      }
    }

    setErrors(errors);
    setFormIsValid(valid);
  };
  return (
    <div className='items-stretch justify-end gap-4 inline-flex mb-3'>
      <Button
        onPress={onOpen}
        className='text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex'
      >
        Añadir nuevo <Plus className='h-4 w-4' />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='w-[700px] max-w-full h-auto overflow-y-auto'
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className='flex flex-col gap-1 font-bold'>
                Formulario de profesional de la salud
              </ModalHeader>
              <ModalBody>
                <Input
                  label='Nombre de usuario'
                  placeholder='Jhon Doe'
                  classNames={{ label: "text-md font-bold" }}
                  value={practitioner.displayName}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      displayName: e.target.value,
                    });
                    if (errors.displayName) {
                      setErrors({ ...errors, displayName: null });
                    }
                  }}
                  isRequired
                />
                {errors.displayName && (
                  <div className='text-red-500'>{errors.displayName}</div>
                )}
                <Input
                  label='Nombre completo'
                  placeholder='Jhon Doe Smith'
                  classNames={{ label: "text-md font-bold" }}
                  value={practitioner.givenName}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      givenName: e.target.value,
                    });
                    if (errors.givenName) {
                      setErrors({ ...errors, givenName: null });
                    }
                  }}
                  isRequired
                />
                {errors.givenName && (
                  <div className='text-red-500'>{errors.givenName}</div>
                )}
                <Input
                  type='email'
                  label='Correo electrónico'
                  placeholder='jhondoe@gmail.com'
                  classNames={{ label: "text-md font-bold" }}
                  value={practitioner.identities[0].issuerAssignedId}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      identities: [
                        {
                          ...practitioner.identities[0],
                          issuerAssignedId: e.target.value,
                        },
                        ...practitioner.identities.slice(1),
                      ],
                    });
                    if (errors.issuerAssignedId) {
                      setErrors({ ...errors, issuerAssignedId: null });
                    }
                  }}
                  isRequired
                />
                {errors.issuerAssignedId && (
                  <div className='text-red-500'>{errors.issuerAssignedId}</div>
                )}
                <Input
                  label='Contraseña de usuario'
                  placeholder='JhonDoe1234@'
                  classNames={{ label: "text-md font-bold" }}
                  value={practitioner.passwordProfile.password}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      passwordProfile: {
                        ...practitioner.passwordProfile,
                        password: e.target.value,
                      },
                    });
                    if (errors.password) {
                      setErrors({ ...errors, password: null });
                    }
                  }}
                  isRequired
                />
                {errors.password && (
                  <div className='text-red-500'>{errors.password}</div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancelar
                </Button>
                <ConfirmModal
                  practitioner={practitioner}
                  FormModalClose={onClose}
                  formIsValid={formIsValid}
                />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
