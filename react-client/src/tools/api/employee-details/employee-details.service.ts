import axios from "axios";
import {handleHttpRequest} from "../handleHttpRequest";
import {
  SimpleEmployeeDetailsRequest,
  SingleEmployeeDetailedResponse,
  SingleMatchingTaskDetail
} from "./employee-details.types";

const getSimpleEmployeeDetails = async (simpleEmployeeDetails: SimpleEmployeeDetailsRequest) => {
  const url = `http://localhost:8080/api/tasks/single-employee-details`;

  const requestBody = simpleEmployeeDetails

  const getSimpleEmployeeDetailsRequest = axios.post<SingleEmployeeDetailedResponse[]>(url, requestBody);
  const response = await handleHttpRequest(getSimpleEmployeeDetailsRequest);
  if (response.status === 'success') {
    return response.data;
  }
  throw new Error('Failed to get matching tasks!');
}

export {getSimpleEmployeeDetails}