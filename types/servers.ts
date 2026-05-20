export interface SSHConfig {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
}

export interface iServersStatusResponse {
  updatedAt: string;
  servers: Server[];
}

export interface Server {
  server: string;
  status: string;
  services: Service[];
}

export interface Service {
  type: string;
  result: Result[];
}

export interface Result {
  service: string;
  status: string;
  pid?: string;
  nginx_upstream?: NginxUpstream[];
}

export interface SystemctlStatus {
  active: boolean;
  pid: string | null;
}

export type ServiceType =
  | "ZOOKEEPER"
  | "DB"
  | "MONGO"
  | "NGINX"
  | "REDIS"
  | "MES_PRD_APP"
  | "WPCL"
  | "IOT"
  | "MES_QAS_APP";

export interface NginxUpstream {
  server_name: string;
  service_name: string;
  server_ip: string;
  running_port: number;
  isUpstream: boolean;
}
