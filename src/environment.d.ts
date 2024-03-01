export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: number;
      USER: string;
      PASSWORD: string;
      DATABASE: string;
      AUTHORZATION_CODE: string;
      QQ: string;
      SECRETKEY: string;
      EXPIRESIN: string;
    }
  }
}
