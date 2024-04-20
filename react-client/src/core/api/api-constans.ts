export enum ApiConstants {
  BASE_API_URL = 'api/v1/'
}

export function getApiUrlBasedOnRouting(controllerUrl: string): string {
  return `${ApiConstants.BASE_API_URL}${controllerUrl}`;
}
