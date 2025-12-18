import { SSHConfig } from "@/types/servers";

export const prd_servers: Record<string, SSHConfig> = {
    MES_PRD_APP1: {
        host: process.env.MES_PRD_SERVER_APP1_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MES_PRD_APP2: {
        host: process.env.MES_PRD_SERVER_APP2_HOST || "",
        port: 22,
        username: "root",
        password: process.env.MES_APP_SERVER_PASSWORD || "",
    },
    MES_PRD_APP3: {
        host: process.env.MES_PRD_SERVER_APP3_HOST || "",
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
