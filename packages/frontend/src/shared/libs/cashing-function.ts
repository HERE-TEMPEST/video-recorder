import _ from 'lodash'

export const cashingFunction = (func: any) => {
	return new Proxy(
		_.assign(func, {
			cash: { startTime: 0, cashedPromise: null, cashedValue: null }
		}),
		{
			async apply(target, _thisArg, args) {
				if (target.cash.cashedValue) {
					if (Date.now() - target.cash.startTime < 5000) {
						return target.cash.cashedValue
					} else {
						target.cash.cashedValue = null
					}
				}

				if (!target.cash.cashedPromise) {
					const promise: Promise<any> = target.apply(_thisArg, args)
					target.cash.cashedPromise = promise
					promise.then((data) => {
						target.cash.cashedPromise = null
						target.cash.cashedValue = data
						target.cash.startTime = Date.now()
						return data
					})
					// .catch((e) => {
					// 	target.cash.cashedPromise = null
					// 	target.cash.cashedValue = e
					// 	target.cash.startTime = Date.now()
					// 	return e
					// })
					return promise
				} else {
					return target.cash.cashedPromise
				}
			}
		}
	)
}
