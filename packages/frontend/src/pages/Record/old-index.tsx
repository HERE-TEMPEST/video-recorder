/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { Ref, useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'

import styles from './Record.module.scss'
import { initSocket } from './socket'

function stop(stream: MediaStream) {
	stream.getTracks().forEach((track) => track.stop())
}

function startRecording(stream: MediaStream, recorderRef: Ref<any>) {
	const recorder = new MediaRecorder(stream)

	recorderRef.current = recorder

	const data: Array<any> = []

	recorder.ondataavailable = (event) => {
		data.push(event.data)
	}

	recorder.start()
	console.log(recorder.state + ' for ' + '? seconds...')

	const stopped = new Promise((resolve, reject) => {
		recorder.onstop = resolve
		recorder.onerror = (event) => reject(event.name)
	})

	return Promise.all([stopped]).then(() => data)
}

export const RecordPage = () => {
	const previewRef = useRef<HTMLVideoElement | undefined>()
	const recordingRef = useRef<HTMLVideoElement | undefined>()
	const downloadBtnRef = useRef<HTMLButtonElement | undefined>()
	const recorderRef = useRef<MediaRecorder | undefined>()

	// const socketRef = useRef<Socket | null>()

	// useEffect(() => {
	// 	if (!socketRef.current) {
	// 		const { connection, disconnect } = initSocket('ws://127.0.0.1:3000/')

	// 		socketRef.current = connection

	// 		return () => {
	// 			disconnect()
	// 			socketRef.current = null
	// 		}
	// 	}
	// }, [])

	const handleClickStopStream = () => {
		if (recorderRef.current) {
			recorderRef.current.state == 'recording' && recorderRef.current.stop()
		}
		if (previewRef.current) {
			stop(previewRef.current.srcObject as any)
		}
	}

	const handleClickStartStream = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			})

			if (previewRef.current && downloadBtnRef.current) {
				previewRef.current.srcObject = stream
				downloadBtnRef.current.href = stream
				previewRef.current.captureStream = previewRef.current.captureStream || previewRef.current.mozCaptureStream

				await new Promise((r) => (previewRef.current!.onplaying = r))

				const chunks = await startRecording(previewRef.current.captureStream(), recorderRef)

				const recordedBlob = new Blob(chunks, {
					type: 'video/webm'
				})

				if (recordingRef.current) {
					recordingRef.current.src = URL.createObjectURL(recordedBlob)
					downloadBtnRef.current.href = recordingRef.current.src
					downloadBtnRef.current.download = 'RecordedVideo.webm'
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<h2>Preview</h2>
				<video ref={previewRef} className={styles.stream} id="preview" width="500" height="500" autoPlay muted></video>
				<div className={styles.btns}>
					<button className="button" onClick={handleClickStartStream}>
						Start
					</button>
					<button onClick={handleClickStopStream} id="stopButton" className="button">
						Stop
					</button>
				</div>
			</div>

			<div className={styles.right}>
				<h2>Recording</h2>
				<video ref={recordingRef} className={styles.stream} id="recording" width="500" height="500" controls></video>
				<div className={styles.btns}>
					<a ref={downloadBtnRef} id="downloadButton" className="button">
						Download
					</a>
				</div>
			</div>

			<div id="log"></div>
		</div>
	)
}
