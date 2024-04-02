type Environment = "local" | "external";

type Settings = {
	environment: Environment;
	localAPIURL: string;
	externalAPIURL: string;
}

export const settings: Settings = {
	environment: 'local',
	localAPIURL: 'http://localhost:3001',
	externalAPIURL: 'https://kjlv54cf-3001.use.devtunnels.ms',
}