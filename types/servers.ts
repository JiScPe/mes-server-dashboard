export interface SSHConfig {
    host: string;
    port: number;
    username: string;
    password?: string;
    privateKey?: string;
}

export interface iModuleStatus {
    module: string;
    status: string;
    pid?: string;
}

export interface iServerItem {
    server: string;
    status: string;
    modules: iModuleStatus[]
}

export interface iServersStatusResponse {
    servers: iServerItem[];
}