import { SSHConfig } from "@/types/servers";

export const prd_servers: Record<string, SSHConfig> = {
    ZOO_PRD_SERVER_1: {
        host: process.env.ZOO_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    ZOO_PRD_SERVER_2: {
        host: process.env.ZOO_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    ZOO_PRD_SERVER_3: {
        host: process.env.ZOO_PRD_SERVER_3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    DB_PRD_SERVER_1: {
        host: process.env.DB_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    DB_PRD_SERVER_2: {
        host: process.env.DB_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MONGO_PRD_SERVER_1: {
        host: process.env.MONGO_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MONGO_PRD_SERVER_2: {
        host: process.env.MONGO_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MONGO_PRD_SERVER_3: {
        host: process.env.MONGO_PRD_SERVER_3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    NGINX_PRD_SERVER_1: {
        host: process.env.NGINX_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    NGINX_PRD_SERVER_2: {
        host: process.env.NGINX_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    REDIS_PRD_APP_1: {
        host: process.env.REDIS_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    REDIS_PRD_APP_2: {
        host: process.env.REDIS_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    REDIS_PRD_APP_3: {
        host: process.env.REDIS_PRD_SERVER_3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    REDIS_PRD_APP_4: {
        host: process.env.REDIS_PRD_SERVER_4_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    REDIS_PRD_APP_5: {
        host: process.env.REDIS_PRD_SERVER_5_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    REDIS_PRD_APP_6: {
        host: process.env.REDIS_PRD_SERVER_6_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MES_PRD_APP_1: {
        host: process.env.MES_PRD_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MES_PRD_APP_2: {
        host: process.env.MES_PRD_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MES_PRD_APP_3: {
        host: process.env.MES_PRD_SERVER_APP3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    WPCL_PRD_APP_1: {
        host: process.env.WPCL_PRD_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    WPCL_PRD_APP_2: {
        host: process.env.WPCL_PRD_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    IOT_PRD_APP_1: {
        host: process.env.IOT_PRD_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    IOT_PRD_APP_2: {
        host: process.env.IOT_PRD_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
};

export const qas_servers: Record<string, SSHConfig> = {
    MES_QAS_APP1: {
        host: process.env.MES_QAS_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MES_QAS_APP2: {
        host: process.env.MES_QAS_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
};
