import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { routes } from '../../shared/routes'

import styles from './Record.module.scss'
import { initSocket } from './socket'
import { VideoWidget } from './Video'

export const RecordPage = () => {
	// const navigator = useNavigate()
	const [funcs, setFuncs] = useState({
		onChunk: (chunk: any) => {
			chunk
			return
		},
		onStart: () => {
			return
		},
		onEnd: () => {
			return
		}
	})

	useEffect(() => {
		const { connection, disconnect } = initSocket('ws://127.0.0.1:3000/')

		setFuncs({
			onChunk: (chunk) => {
				connection.emit('fragment', chunk)
			},
			onEnd: () => {
				connection.emit('end')
			},
			onStart: () => {
				connection.emit('start')
			}
		})

		// if (!connection.connected) {
		// 	disconnect()
		// 	navigator(routes.profile.goto(), { replace: true })
		// }

		return () => {
			disconnect()
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<VideoWidget onEndChunks={funcs.onEnd} onStartChunks={funcs.onStart} onChunk={funcs.onChunk} />
		</div>
	)
}
