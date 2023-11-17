declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      DB_PORT?: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      MYSQL_DB: string;
      TOKEN_NAME: string;
      FE_URL: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
