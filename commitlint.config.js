module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 커밋 타입 제한
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 새로운 기능
        'fix',      // 버그 수정
        'docs',     // 문서 변경
        'style',    // 코드 포맷팅, 세미콜론 누락 등
        'refactor', // 리팩토링
        'test',     // 테스트 추가/수정
        'chore',    // 빌드 업무 수정, 패키지 매니저 수정
        'perf',     // 성능 개선
        'ci',       // CI 설정 변경
        'build',    // 빌드 시스템 변경
        'revert'    // 이전 커밋 되돌리기
      ]
    ],
    // 제목 최대 길이
    'subject-max-length': [2, 'always', 72],
    // 제목 최소 길이  
    'subject-min-length': [2, 'always', 3],
    // 제목 끝에 마침표 금지
    'subject-full-stop': [2, 'never', '.'],
    // 제목 대소문자 (소문자로 시작)
    'subject-case': [2, 'always', 'lower-case'],
    // 본문 최대 행 길이
    'body-max-line-length': [2, 'always', 100],
    // 헤더 최대 길이
    'header-max-length': [2, 'always', 100]
  }
};
