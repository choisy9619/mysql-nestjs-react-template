// 사용자 친화적 에러 메시지 상수
export const ERROR_MESSAGES = {
  // 인증 관련
  EMAIL_ALREADY_EXISTS: 'This email is already registered',
  USERNAME_ALREADY_EXISTS: 'This username is already taken',
  INVALID_CREDENTIALS: 'Invalid email or password',

  // 검증 관련
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORD_TOO_WEAK: 'Password must contain uppercase, lowercase, number and special character',
  USERNAME_TOO_SHORT: 'Username must be at least 3 characters',
  USERNAME_INVALID: 'Username can only contain letters, numbers and underscores',

  // 일반 에러
  USER_NOT_FOUND: 'User not found',
  INTERNAL_ERROR: 'Something went wrong. Please try again later',

  // 필드별 에러 (내부 사용)
  REQUIRED_FIELD: (field: string) => `${field} is required`,
} as const;

// 프론트엔드 분기 처리용 에러 코드
export const ERROR_CODES = {
  // 인증
  EMAIL_DUPLICATE: 'EMAIL_DUPLICATE',
  USERNAME_DUPLICATE: 'USERNAME_DUPLICATE',
  INVALID_PASSWORD: 'INVALID_PASSWORD',

  // 검증
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
  PASSWORD_TOO_WEAK: 'PASSWORD_TOO_WEAK',

  // 리소스
  USER_NOT_FOUND: 'USER_NOT_FOUND',

  // 일반
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
