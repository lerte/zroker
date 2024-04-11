export type Environment = {
  address: string;
  createdAt: number;
  description: string;
  host: string;
  updatedAt: number;
  zId: string;
};

export type Share = {
  backendMode: "proxy" | "web" | "caddy" | "drive";
  backendProxyEndpoint: string;
  createdAt: number;
  frontendEndpoint: string;
  frontendSelection: "public" | "private";
  shareMode: "public" | "private";
  token: string;
  updatedAt: number;
  zId: string;
};
