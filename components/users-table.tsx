"use client";

import {
  Input,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SearchIcon, Trash } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { practitionersTableColumns, patientsTableColumns } from "@/data/data";
import CustomSuspense from "@/components/ui/custom-suspense";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import msgraphService from "@/services/msgraphService";
import Loading from "@/components/ui/loading";

type User = {
  name_id: string;
  email: string;
  user_id: string;
};

interface UserProps {
  user_id: string;
  patientFormModalClose: () => void;
}

interface TableProps {
  userType: string;
}

const ConfirmModal: React.FC<UserProps> = ({
  user_id,
  patientFormModalClose,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const handleDelete = () => {
    msgraphService.deleteUserById(user_id);
    location.reload();
    onClose();
    patientFormModalClose();
  };

  return (
    <>
      <Button
        className={" text-sm font-medium "}
        color='danger'
        radius='sm'
        size='sm'
        variant='flat'
        onPress={() => {
          onOpen();
        }}
      >
        <Trash className='h-3 w-3' />
        Eliminar
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
                Confirmar eliminación del paciente
              </ModalHeader>
              <ModalBody>
                <div>¿Estas seguro que quieres continuar?</div>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='danger' onClick={handleDelete}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const UsersTable: React.FC<TableProps> = ({ userType }) => {
  const [filterValue, setFilterValue] = useState("");
  const [patientsList, setPatientsList] = useState<User[]>([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name_id",
    direction: "ascending",
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (userType === "Patient"
          ? msgraphService.getPatientList()
          : msgraphService.getPractitionerList());

        if (data && data.value.length > 0) {
          const updatedList = data.value.map(
            (patient: any) =>
              ({
                name_id: patient.displayName,
                email: patient.identities[0].issuerAssignedId,
                user_id: patient.id ? patient.id : "N/A",
              } as User)
          );
          setPatientsList(updatedList);
        } else {
          setPatientsList([]);
        }
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "actions":
        return (
          <div className='relative flex justify-start items-start gap-2'>
            <Button
              className={" text-sm font-medium "}
              color='primary'
              radius='sm'
              size='sm'
              variant='flat'
              onClick={() =>
                router.push(
                  ` ${userType === "Patient" ? "patients" : "practitioners"}/${
                    user.user_id
                  }`
                )
              }
            >
              Ver más
            </Button>
            <ConfirmModal
              user_id={user.user_id}
              patientFormModalClose={onClose}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...patientsList];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name_id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [patientsList, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof User
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='bg-blue-100 flex flex-col gap-4 rounded-lg'>
        <div className='flex gap-3 items-end'>
          <Input
            isClearable
            variant='faded'
            size='sm'
            className='w-full sm:max-w-[26%] ml-1 mb-2 mt-2'
            placeholder='Buscar por nombre...'
            startContent={<SearchIcon className='h-4 w-4' />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Input
            isClearable
            variant='faded'
            size='sm'
            className='w-full sm:max-w-[26%] mb-2 mt-2'
            placeholder='Buscar por ID...'
            startContent={<SearchIcon className='h-4 w-4' />}
            onClear={() => onClear()}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  return (
    <CustomSuspense
      isLoading={patientsList === null}
      fallback={<TableSkeleton />}
    >
      <Table
        color='primary'
        aria-label='User table'
        selectionBehavior='toggle'
        isHeaderSticky
        selectionMode='single'
        topContent={topContent}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys}
      >
        <TableHeader
          columns={
            userType === "Patient"
              ? patientsTableColumns
              : practitionersTableColumns
          }
        >
          {(column) => (
            <TableColumn
              className='text-bold'
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={<Loading />}
          items={patientsList}
        >
          {(item) => (
            <TableRow key={item.user_id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CustomSuspense>
  );
};
