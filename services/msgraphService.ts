import { callMsGraph } from "@/lib/utils/MsGraphApiCall";
require("dotenv").config();

class MsGraphService {
  getMe = () => {
    return callMsGraph("me", "GET", null);
  };
  getPatientList = () => {
    return callMsGraph(
      `users?$filter=extension_${process.env.EXTENSION_APP_CLIENT_ID}_UserRole eq 'patient'`,
      "GET",
      null
    );
  };
  createUser = (data: any) => {
    return callMsGraph("users", "POST", data);
  };

  getPractitionerList = () => {
    return callMsGraph(
      `users?$filter=extension_${process.env.EXTENSION_APP_CLIENT_ID}_UserRole eq 'practitioner'`,
      "GET",
      null
    );
  };

  getUserById = (id: string) => {
    return callMsGraph(`users/${id}`, "GET", null);
  }

  deleteUserById = (id: string) => {
    return callMsGraph(`users/${id}`, "DELETE", null);
  };
}

export default new MsGraphService();
