import { SSHConfig } from '@/types/servers';

export const prd_servers: Record<string, SSHConfig> = {
    ZOO_PRD_SERVER_1: {
        host: process.env.ZOO_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.ZOO_PRD_SERVER_1_PRD_LINE_IP || "",
    },
    ZOO_PRD_SERVER_2: {
        host: process.env.ZOO_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.ZOO_PRD_SERVER_2_PRD_LINE_IP || "",
    },
    ZOO_PRD_SERVER_3: {
        host: process.env.ZOO_PRD_SERVER_3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.ZOO_PRD_SERVER_3_PRD_LINE_IP || "",
    },
    DB_PRD_SERVER_1: {
        host: process.env.DB_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.DB_PRD_SERVER_1_PRD_LINE_IP || "",
    },
    DB_PRD_SERVER_2: {
        host: process.env.DB_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.DB_PRD_SERVER_2_PRD_LINE_IP || "",
    },
    MONGO_PRD_SERVER_1: {
        host: process.env.MONGO_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MONGO_PRD_SERVER_1_PRD_LINE_IP || "",
    },
    MONGO_PRD_SERVER_2: {
        host: process.env.MONGO_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MONGO_PRD_SERVER_2_PRD_LINE_IP || "",
    },
    MONGO_PRD_SERVER_3: {
        host: process.env.MONGO_PRD_SERVER_3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MONGO_PRD_SERVER_3_PRD_LINE_IP || "",
    },
    NGINX_PRD_SERVER_1: {
        host: process.env.NGINX_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.NGINX_PRD_SERVER_1_PRD_LINE_IP || "",
    },
    NGINX_PRD_SERVER_2: {
        host: process.env.NGINX_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.NGINX_PRD_SERVER_2_PRD_LINE_IP || "",
    },
    REDIS_PRD_APP_1: {
        host: process.env.REDIS_PRD_SERVER_1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.REDIS_PRD_SERVER_1_PRD_LINE_IP || "",
    },
    REDIS_PRD_APP_2: {
        host: process.env.REDIS_PRD_SERVER_2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.REDIS_PRD_SERVER_2_PRD_LINE_IP || "",
    },
    REDIS_PRD_APP_3: {
        host: process.env.REDIS_PRD_SERVER_3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.REDIS_PRD_SERVER_3_PRD_LINE_IP || "",
    },
    REDIS_PRD_APP_4: {
        host: process.env.REDIS_PRD_SERVER_4_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.REDIS_PRD_SERVER_4_PRD_LINE_IP || "",
    },
    REDIS_PRD_APP_5: {
        host: process.env.REDIS_PRD_SERVER_5_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.REDIS_PRD_SERVER_5_PRD_LINE_IP || "",
    },
    REDIS_PRD_APP_6: {
        host: process.env.REDIS_PRD_SERVER_6_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.REDIS_PRD_SERVER_6_PRD_LINE_IP || "",
    },
    MES_PRD_APP_1: {
        host: process.env.MES_PRD_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MES_PRD_SERVER_APP1_PRD_LINE_IP || "",
    },
    MES_PRD_APP_2: {
        host: process.env.MES_PRD_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MES_PRD_SERVER_APP2_PRD_LINE_IP || "",
    },
    MES_PRD_APP_3: {
        host: process.env.MES_PRD_SERVER_APP3_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MES_PRD_SERVER_APP3_PRD_LINE_IP || "",
    },
    WPCL_PRD_APP_1: {
        host: process.env.WPCL_PRD_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.WPCL_PRD_SERVER_APP1_PRD_LINE_IP || "",
    },
    WPCL_PRD_APP_2: {
        host: process.env.WPCL_PRD_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.WPCL_PRD_SERVER_APP2_PRD_LINE_IP || "",
    },
    IOT_PRD_APP_1: {
        host: process.env.IOT_PRD_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.IOT_PRD_SERVER_APP1_PRD_LINE_IP || "",
    },
    IOT_PRD_APP_2: {
        host: process.env.IOT_PRD_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.IOT_PRD_SERVER_APP2_PRD_LINE_IP || "",
    },
};

export const qas_servers: Record<string, SSHConfig> = {
    MES_QAS_APP1: {
        host: process.env.MES_QAS_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MES_QAS_SERVER_APP1_PRD_LINE_IP || "",
    },
    MES_QAS_APP2: {
        host: process.env.MES_QAS_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
        prodLineIP: process.env.MES_QAS_SERVER_APP2_PRD_LINE_IP || "",
    },
};

/**
 * Unified lookup
 */
export const ALL_SERVERS: Record<string, SSHConfig> = {
  ...prd_servers,
  ...qas_servers,
};