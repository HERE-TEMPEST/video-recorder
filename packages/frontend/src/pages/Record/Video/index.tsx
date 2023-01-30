/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '../../../shared/ui'
import { getMediaStream, stopMediaStream } from './tools'

import styles from './Video.module.scss'

interface HTMLVideoElementWithCaptureStream extends HTMLVideoElement {
	captureStream(): MediaStream
	mozCaptureStream(): MediaStream
}

interface VideoWidgetProps {
	onChunk: (chunk: Blob) => void
	onStartChunks: () => void
	onEndChunks: () => void
}

export const VideoWidget: React.FC<VideoWidgetProps> = (props: VideoWidgetProps) => {
	const { onChunk, onEndChunks, onStartChunks } = props

	const previewRef = useRef<HTMLVideoElementWithCaptureStream | null>(null)
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

	const [playState, setPlayState] = useState(false)

	useEffect(() => {
		if (playState) {
			getMediaStream().then((stream) => {
				setMediaStream(stream)
			})
		}

		return () => {
			stopMediaStream(mediaStream)
			setMediaStream(null)
		}
	}, [playState])

	useEffect(() => {
		if (previewRef.current !== null && mediaStream) {
			previewRef.current.srcObject = mediaStream
			const captureStream = previewRef.current

			const recorder = new MediaRecorder(mediaStream)
			const data: Array<Blob> = []

			recorder.ondataavailable = (event) => {
				data.push(event.data)
			}
			recorder.start()

			const stopped = new Promise((resolve, reject) => {
				recorder.onstop = resolve
				recorder.onerror = (event) => reject(event)
			})

			stopped
				.then(() => {
					const recordedBlob = new Blob(data, {
						type: 'video/webm'
					})

					const writebale = new WritableStream({
						write: (chunk: any) => {
							onChunk(chunk)
						},
						start() {
							onStartChunks()
						},
						close: () => {
							onEndChunks()
						}
					})
					recordedBlob.stream().pipeTo(writebale)
				})
				.catch((e: any) => {
					console.log(e)
				})

			return () => {
				recorder.state == 'recording' && recorder.stop()

				stopMediaStream(captureStream.srcObject as any)
			}
		}
	}, [mediaStream])

	const onStopRecordHandler = () => {
		setPlayState(false)
	}
	const onStartRecordHandler = async () => {
		setPlayState(true)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.videoWrapper}>{playState && <video ref={previewRef} autoPlay muted />}</div>
			<div className={styles.navigations}>
				<div className={styles.timeRecord}>33:22</div>

				<div className={styles.playStop} onClick={playState ? onStopRecordHandler : onStartRecordHandler}>
					<Icon type={playState ? 'stop' : 'play'} />
				</div>
			</div>
		</div>
	)
}
