import * as appSettings from '../appsettings.json'

export function getBaseUrl(): string {
    return appSettings.baseUrl;
}