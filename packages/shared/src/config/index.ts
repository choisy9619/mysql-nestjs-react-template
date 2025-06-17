import * as fs from 'node:fs';
import * as path from 'node:path';

export interface AppConfig {
  app: {
    name: string;
    version: string;
    port: number;
    nodeEnv: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    synchronize: boolean;
    logging: boolean;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  cors: {
    origin: string;
    credentials: boolean;
  };
  frontend: {
    apiBaseUrl: string;
    appTitle: string;
  };
}

/**
 * 환경에 따라 적절한 설정 파일을 로드합니다.
 * @param environment 환경 이름 (development, production)
 * @returns 로드된 설정 객체
 */
export function loadConfig(environment?: string): AppConfig {
  const env = environment || process.env.NODE_ENV || 'development';

  // 프로젝트 루트에서 config 폴더 찾기
  const projectRoot = findProjectRoot();
  const configPath = path.join(projectRoot, 'config', `${env}.json`);

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Configuration file not found: ${configPath}
Available environments: development, production
Please copy config/template.json to config/${env}.json and update values.`
    );
  }

  try {
    const configFile = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configFile) as AppConfig;

    // 환경변수로 민감한 값들 오버라이드 (옵션)
    if (process.env.DB_PASSWORD) {
      config.database.password = process.env.DB_PASSWORD;
    }
    if (process.env.JWT_SECRET) {
      config.jwt.secret = process.env.JWT_SECRET;
    }

    return config;
  } catch (error) {
    throw new Error(
      `Failed to parse configuration file: ${configPath}
Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 프로젝트 루트 디렉토리를 찾습니다.
 * package.json이 있는 상위 디렉토리를 찾아갑니다.
 */
function findProjectRoot(): string {
  let currentDir = __dirname;

  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    const configDirPath = path.join(currentDir, 'config');

    if (fs.existsSync(packageJsonPath) && fs.existsSync(configDirPath)) {
      return currentDir;
    }

    currentDir = path.dirname(currentDir);
  }

  throw new Error(
    `Could not find project root directory. 
    Please ensure you are running from within the project and that package.json and config
    directory exist in the project root.`
  );
}

/**
 * 프론트엔드에서 사용할 설정만 필터링합니다.
 * (민감한 정보 제외)
 */
export function getFrontendConfig(config: AppConfig) {
  return {
    app: {
      name: config.app.name,
      version: config.app.version,
      title: config.frontend.appTitle,
    },
    api: {
      baseUrl: config.frontend.apiBaseUrl,
    },
  };
}

// 기본 설정 로드 (즉시 사용을 위한)
export const config = loadConfig();
