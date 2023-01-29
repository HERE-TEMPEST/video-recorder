import { AppConfig } from './app'
import { Auth2Config } from './auth2'
import { JwtConfig } from './jwt'

export interface Config extends AppConfig, Auth2Config, JwtConfig {}
