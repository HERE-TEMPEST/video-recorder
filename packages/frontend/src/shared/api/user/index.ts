import _ from 'lodash'
import { cashingFunction } from '../../libs'
import * as getsRequests from './gets'
import * as putsRequests from './puts'

const cashFunctions = (funcs: any) => {
	return _.keys(funcs).reduce((obj: any, key: string) => {
		obj[key] = cashingFunction(_.get(funcs, key))

		return obj
	}, {})
}

export const users = {
	...cashFunctions(getsRequests),
	...putsRequests
}
