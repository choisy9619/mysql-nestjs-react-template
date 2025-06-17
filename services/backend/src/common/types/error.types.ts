// 통합된 에러 데이터 타입
export interface ErrorData {
  message: string; // 사용자에게 보여줄 메시지
  field?: string; // 특정 필드 에러인 경우 (validation, conflict)
  resource?: string; // 리소스 관련 에러인 경우 (not found)
  code?: string; // 에러 코드 (프론트엔드 분기 처리용)
}

// 사용 편의를 위한 헬퍼 타입들 (선택사항)
export type ValidationError = ErrorData & { field: string };
export type ConflictError = ErrorData & { field: string };
export type NotFoundError = ErrorData & { resource: string };
