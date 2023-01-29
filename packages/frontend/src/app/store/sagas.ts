import { all } from 'redux-saga/effects'

import { sagasWatchers } from '../../entities/user'

export const rootWatcher = function* () {
	yield all([sagasWatchers.userAsyncActionsWatcher()])
}
