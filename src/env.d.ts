declare namespace NodeJS {
    interface ProcessEnv {
        ENV: string,
        PORT: string,
        SECRET: string,
    }
}