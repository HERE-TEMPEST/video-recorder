import { loadAppConfig } from './app'
import { loadAuth2Config } from './auth2'
import { loadJwtConfig } from './jwt'

export const configLoader = [loadAppConfig, loadAuth2Config, loadJwtConfig]
