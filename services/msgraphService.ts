import { callMsGraph } from "@/lib/utils/MsGraphApiCall";

class MsGraphService {
  getMe = () => {
    return callMsGraph("me", "GET", null);
  };
  getPatientList = () => {
    return callMsGraph(
      "users?$filter=extension_25549976ad3f4b408bd442ed65100575_UserRole eq 'patient'",
      "GET",
      null
    );
  };
  createUser = (data: any) => {
    return callMsGraph("users", "POST", data);
  };

  getPractitionerList = () => {
    return callMsGraph(
      "users?$filter=extension_25549976ad3f4b408bd442ed65100575_UserRole eq 'practitioner'",
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
