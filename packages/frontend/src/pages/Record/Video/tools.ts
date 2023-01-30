export const getMediaStream = () => {
	return navigator.mediaDevices.getUserMedia({
		video: true,
		audio: true
	})
}

export const stopMediaStream = (stream: MediaStream | null | undefined) => {
	stream?.getTracks().map((track) => track.stop())
}
