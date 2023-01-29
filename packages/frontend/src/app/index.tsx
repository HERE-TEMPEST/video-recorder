import React from 'react'

import { withProviders } from './providers'
import { CvBuilderRouting } from '../pages'

import './styles/index.scss'

const CvBuilderApp = () => {
	return <CvBuilderRouting />
}

export default withProviders(CvBuilderApp)
