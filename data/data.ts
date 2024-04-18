const practitionersTableColumns = [
  { name: "ID", uid: "user_id", sortable: true },
  { name: "NOMBRE", uid: "name_id", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "ACCIÓN", uid: "actions" },
];

const patientsTableColumns = [
  { name: "ID", uid: "user_id", sortable: true },
  { name: "NOMBRE", uid: "name_id", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "ACTION", uid: "actions" },
];

interface Identity {
  issuer: string;
  issuerAssignedId: string;
  signInType: string;
}
interface Admin {
  id: string;
  displayName: string;
  telephone: string;
  address: {
    type_address: string;
    address_line: string;
    province: string;
    district: string;
    department: string;
    postal_code: string;
  };
  identities: Identity[];
}
const emptyAdmin: Admin = {
  id: "",
  displayName: "",
  telephone: "",
  address: {
    type_address: "",
    address_line: "",
    province: "",
    district: "",
    department: "",
    postal_code: "",
  },
  identities: [],
};

export { practitionersTableColumns, patientsTableColumns, emptyAdmin };
