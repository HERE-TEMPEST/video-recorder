export const routes = {
	profile: {
		path: '/',
		goto() {
			return '/'
		}
	},
	projects: {
		path: 'projects',
		goto() {
			return '/projects'
		},
		archive: {
			path: 'archive',
			goto() {
				return '/projects/archive'
			}
		},
		active: {
			path: '',
			goto() {
				return '/projects'
			}
		}
	},
	skills: {
		path: 'skills',
		goto() {
			return '/skills'
		}
	},
	storage: {
		path: 'storage',
		goto() {
			return '/storage'
		}
	},
	login: {
		path: '/login',
		goto() {
			return '/login'
		}
	}
}
