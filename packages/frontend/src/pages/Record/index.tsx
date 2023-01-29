/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react'
import { Icon } from '../../shared/ui'

import styles from './Record.module.scss'

export const RecordPage = () => {
	const previewRef = useRef<HTMLVideoElement | undefined>()
	const [stage, setStage] = useState(true)

	const onStopRecordHandler = async () => {
		try {
			if (previewRef.current) {
				previewRef.current.srcObject.getTracks().forEach((track) => track.stop())
			}

			setStage(true)
		} catch (e) {
			console.log(e)
		}
	}

	const onStartRecordHandler = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			})

			if (previewRef.current) {
				previewRef.current.srcObject = stream
				previewRef.current.captureStream = previewRef.current.captureStream || previewRef.current.mozCaptureStream

				await new Promise((r) => (previewRef.current!.onplaying = r))
			}

			setStage(false)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.videoWrapper}>
				<video ref={previewRef} autoPlay muted />
			</div>
			<div className={styles.navigations}>
				<div className={styles.timeRecord}>12:22</div>

				<div className={styles.playStop} onClick={stage ? onStartRecordHandler : onStopRecordHandler}>
					<Icon type={stage ? 'play' : 'stop'} />
				</div>
			</div>
		</div>
	)
}
