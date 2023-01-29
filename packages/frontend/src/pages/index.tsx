import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { MainPage } from './Main'
import { RecordPage } from './Record/index'

export const CvBuilderRouting = () => {
	return (
		<Routes>
			<Route index path={'/'} element={<MainPage />} />
			<Route index path={'/recording'} element={<RecordPage />} />
		</Routes>
	)
}
