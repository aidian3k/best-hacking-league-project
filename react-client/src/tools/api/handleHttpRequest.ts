import axios, { AxiosResponse } from 'axios';
import { ApiErrorResponseData, ApiResponse } from './api-service.types';

export async function handleHttpRequest<T>(request: Promise<AxiosResponse<T, any>>): Promise<ApiResponse<T>> {
  try {
    const response = await request;
    return {
      status: 'success',
      data: response.data
    };
  } catch (error: unknown) {
    if (axios.isAxiosError<ApiErrorResponseData>(error)) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        return {
          status: 'error',
          message: error.response.data.message ?? 'Something went wrong during the request'
        };
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }
    } else {
      console.error('Unknown error:', error);
    }
    return {
      status: 'error',
      message: 'Something went wrong during the request'
    };
  }
}
