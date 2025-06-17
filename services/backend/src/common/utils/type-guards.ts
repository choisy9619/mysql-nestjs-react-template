import { ApiResponse, ErrorResponse, SuccessResponse } from '../dto/api-response.dto';
import { ErrorData } from '../types/error.types';

/**
 * 성공 응답인지 확인하는 타입 가드
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T> | ApiResponse<ErrorData>
): response is SuccessResponse<T> {
  return response.success === true;
}

/**
 * 에러 응답인지 확인하는 타입 가드
 */
export function isErrorResponse(response: ApiResponse<any>): response is ErrorResponse {
  return response.success === false;
}

/**
 * 특정 에러 코드인지 확인하는 헬퍼
 */
export function hasErrorCode(response: ErrorResponse, code: string): boolean {
  return response.data?.code === code;
}

/**
 * Validation 에러인지 확인
 */
export function isValidationError(response: ErrorResponse): boolean {
  return response.data?.field !== undefined && response.data?.resource === undefined;
}

/**
 * Conflict 에러인지 확인
 */
export function isConflictError(response: ErrorResponse): boolean {
  return response.data?.code?.includes('DUPLICATE') || false;
}

/**
 * Not Found 에러인지 확인
 */
export function isNotFoundError(response: ErrorResponse): boolean {
  return response.data?.resource !== undefined && response.data?.field === undefined;
}
