import React from 'react'

import styles from './Main.module.scss'
import ImageGoogleAuth2 from '../../../public/google-auth2.png'

export const MainPage = () => {
	return (
		<div className={styles.wrapper}>
			<form className={styles.formLogin} method="GET" action="http://localhost:3000/api/auth20/google/sign-in">
				<button type="submit">
					<img src={ImageGoogleAuth2} alt="" />
				</button>
			</form>
		</div>
	)
}
