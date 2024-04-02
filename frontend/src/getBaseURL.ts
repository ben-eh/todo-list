import { settings } from './appSettings';

export const getBaseURL = () => {
	if (settings.environment === 'local') return settings.localAPIURL;
	return settings.externalAPIURL;
}