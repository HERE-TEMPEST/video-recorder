import React from 'react'

interface IconProps {
	type: string
}

export const Icon: React.FC<IconProps> = (props: IconProps) => {
	const { type } = props

	switch (type) {
		case 'play':
			return (
				<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M19.1667 18.8166V29.5166C19.1667 30.2833 19.5167 30.8666 20.2167 31.2666C20.9167 31.6666 21.6 31.6333 22.2667 31.1666L30.5667 25.8666C31.2 25.4666 31.5167 24.9 31.5167 24.1666C31.5167 23.4333 31.2 22.8666 30.5667 22.4666L22.2667 17.1666C21.6 16.7 20.9167 16.6666 20.2167 17.0666C19.5167 17.4666 19.1667 18.05 19.1667 18.8166ZM24.1667 44.1666C21.4 44.1666 18.8 43.6413 16.3667 42.5906C13.9334 41.5413 11.8167 40.1166 10.0167 38.3166C8.21669 36.5166 6.79202 34.4 5.74269 31.9666C4.69202 29.5333 4.16669 26.9333 4.16669 24.1666C4.16669 21.4 4.69202 18.8 5.74269 16.3666C6.79202 13.9333 8.21669 11.8166 10.0167 10.0166C11.8167 8.21663 13.9334 6.79129 16.3667 5.74063C18.8 4.69129 21.4 4.16663 24.1667 4.16663C26.9334 4.16663 29.5334 4.69129 31.9667 5.74063C34.4 6.79129 36.5167 8.21663 38.3167 10.0166C40.1167 11.8166 41.5414 13.9333 42.5907 16.3666C43.6414 18.8 44.1667 21.4 44.1667 24.1666C44.1667 26.9333 43.6414 29.5333 42.5907 31.9666C41.5414 34.4 40.1167 36.5166 38.3167 38.3166C36.5167 40.1166 34.4 41.5413 31.9667 42.5906C29.5334 43.6413 26.9334 44.1666 24.1667 44.1666Z"
						fill="#EE8D8D"
					/>
				</svg>
			)

		case 'stop':
			return (
				<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M24.1666 44.1666C21.4 44.1666 18.8 43.6413 16.3666 42.5906C13.9333 41.5413 11.8166 40.1166 10.0166 38.3166C8.21663 36.5166 6.79196 34.4 5.74263 31.9666C4.69196 29.5333 4.16663 26.9333 4.16663 24.1666C4.16663 21.4 4.69196 18.8 5.74263 16.3666C6.79196 13.9333 8.21663 11.8166 10.0166 10.0166C11.8166 8.21663 13.9333 6.79129 16.3666 5.74063C18.8 4.69129 21.4 4.16663 24.1666 4.16663C26.9333 4.16663 29.5333 4.69129 31.9666 5.74063C34.4 6.79129 36.5166 8.21663 38.3166 10.0166C40.1166 11.8166 41.5413 13.9333 42.5906 16.3666C43.6413 18.8 44.1666 21.4 44.1666 24.1666C44.1666 26.9333 43.6413 29.5333 42.5906 31.9666C41.5413 34.4 40.1166 36.5166 38.3166 38.3166C36.5166 40.1166 34.4 41.5413 31.9666 42.5906C29.5333 43.6413 26.9333 44.1666 24.1666 44.1666ZM18.1666 32.1666H30.1666C30.7333 32.1666 31.2086 31.9746 31.5926 31.5906C31.9753 31.208 32.1666 30.7333 32.1666 30.1666V18.1666C32.1666 17.6 31.9753 17.1246 31.5926 16.7406C31.2086 16.358 30.7333 16.1666 30.1666 16.1666H18.1666C17.6 16.1666 17.1253 16.358 16.7426 16.7406C16.3586 17.1246 16.1666 17.6 16.1666 18.1666V30.1666C16.1666 30.7333 16.3586 31.208 16.7426 31.5906C17.1253 31.9746 17.6 32.1666 18.1666 32.1666Z"
						fill="#EE8D8D"
					/>
				</svg>
			)

		default:
			return null
	}
}
