import { ErrorData } from '../types/error.types';

export class ApiResponse<TData = null> {
  success: boolean;
  message: string;
  data: TData;

  constructor(success: boolean, message: string, data: TData) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<TData>(data: TData, message = 'Success'): ApiResponse<TData> {
    return new ApiResponse(true, message, data);
  }

  // 에러 응답 - 유연한 방식으로 개선
  static error(message: string, errorData?: Partial<ErrorData>): ApiResponse<ErrorData> {
    const data: ErrorData = {
      message,
      ...errorData,
    };
    return new ApiResponse(false, message, data);
  }

  // 편의 메서드들
  static validationError(field: string, message: string, code?: string): ApiResponse<ErrorData> {
    return ApiResponse.error(message, { field, code });
  }

  static conflictError(field: string, message: string, code?: string): ApiResponse<ErrorData> {
    return ApiResponse.error(message, { field, code });
  }

  static notFoundError(resource: string, message: string, code?: string): ApiResponse<ErrorData> {
    return ApiResponse.error(message, { resource, code });
  }

  static paginated<TItem>(
    items: TItem[],
    total: number,
    page: number,
    limit: number,
    message = 'Success'
  ): ApiResponse<{
    items: TItem[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    return new ApiResponse(true, message, {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
}

export type SuccessResponse<T> = ApiResponse<T> & { success: true };
export type ErrorResponse = ApiResponse<ErrorData> & { success: false };
