export let brand = {
	name: 'TScorp',
	short_name: 'TS',
	url: '/',
}
export let sidebar = [
	{
		name: 'Dashboard',
		items: [
			{
				url: '',
				name: 'Dashboard',
				icon: 'command',
				items: [
					{
						url: '/dashboard/index',
						name: 'General Dashboard',
					},
					{
						url: '/dashboard/ecommerce',
						name: 'Ecommerce Dashboard',
					},
				],
			},
		],
	},
	{
		name: 'Starter',
		items: [
			{
				name: 'Layout',
				icon: 'columns',
				items: [
					{
						url: '/layout/index',
						name: 'Default Layout',
					},
					{
						url: '/layout/transparent',
						name: 'Transparent Sidebar',
					},
					{
						url: '/layout/top',
						name: 'Top Navigation',
					},
				],
			},
			{
				name: 'Blank Page',
				icon: 'square',
			},
			{
				name: 'Bootstrap',
				icon: 'grid',
				items: [
					{
						url: '/bootstrap/alert',
						name: 'Alert',
					},
					{
						url: '/bootstrap/badge',
						name: 'Badge',
					},
					{
						url: '/bootstrap/breadcrumb',
						name: 'Breadcrumb',
					},
					{
						url: '/bootstrap/buttons',
						name: 'Buttons',
					},
					{
						url: '/bootstrap/card',
						name: 'Card',
					},
					{
						url: '/bootstrap/carousel',
						name: 'Carousel',
					},
					{
						url: '/bootstrap/collapse',
						name: 'Collapse',
					},
					{
						url: '/bootstrap/dropdown',
						name: 'Dropdown',
					},
					{
						url: '/bootstrap/form',
						name: 'Form',
					},
					{
						url: '/bootstrap/list-group',
						name: 'List Group',
					},
					{
						url: '/bootstrap/media-object',
						name: 'Media Object',
					},
					{
						url: '/bootstrap/modal',
						name: 'Modal',
					},
					{
						url: '/bootstrap/nav',
						name: 'Nav',
					},
					{
						url: '/bootstrap/navbar',
						name: 'Navbar',
					},
					{
						url: '/bootstrap/pagination',
						name: 'Pagination',
					},
					{
						url: '/bootstrap/popover',
						name: 'Popover',
					},
					{
						url: '/bootstrap/progress',
						name: 'Progress',
					},
					{
						url: '/bootstrap/table',
						name: 'Table',
					},
					{
						url: '/bootstrap/tooltip',
						name: 'Tooltip',
					},
					{
						url: '/bootstrap/typography',
						name: 'Typography',
					},
				],
			},
		],
	},
	{
		name: 'Stisla',
		items: [
			{
				name: 'Components',
				icon: 'codesandbox',
				items: [
					{
						url: '/stisla/components/article',
						beep: true,
						name: 'Article',
					},
					{
						url: '/stisla/components/avatar',
						name: 'Avatar',
					},
					{
						url: '/stisla/components/chat-box',
						name: 'Chat Box',
					},
					{
						url: '/stisla/components/empty-state',

						name: 'Empty State',
					},
					{
						url: '/stisla/components/gallery',
						name: 'Gallery',
					},
					{
						url: '/stisla/components/hero',

						name: 'Hero',
					},
					{
						url: '/stisla/components/multiple-upload',
						name: 'Multiple Upload',
					},
					{
						url: '/stisla/components/pricing',

						name: ' Pricing ',
					},
					{
						url: '/stisla/components/statistic',
						name: 'Statistic',
					},
					{
						url: '/stisla/components/tab',
						name: 'Tab',
					},
					{
						url: '/stisla/components/table',
						name: 'Table',
					},
					{
						url: '/stisla/components/user',
						name: 'User',
					},
					{
						url: '/stisla/components/wizard',

						name: 'Wizard',
					},
				],
			},
			{
				url: '',
				name: 'Forms',
				icon: 'file',
				items: [
					{
						url: '/stisla/forms/advanced',
						name: 'Advanced Form',
					},
					{
						url: '/stisla/forms/editor',
						name: 'Editor',
					},
					{
						url: '/stisla/forms/validation',
						name: 'Validation',
					},
				],
			},
			{
				url: '',
				name: 'Google Maps',
				icon: 'map',
				items: [
					{
						url: '/stisla/gmaps/advanced',
						name: 'Advanced Route',
					},
					{
						url: '/stisla/gmaps/draggable-marker',
						name: 'Draggable Marker',
					},
					{
						url: '/stisla/gmaps/geocoding',
						name: 'Geocoding',
					},
					{
						url: '/stisla/gmaps/geolaction',
						name: 'Geolocation',
					},
					{
						url: '/stisla/gmaps/marker',
						name: 'Marker',
					},
					{
						url: '/stisla/gmaps/multiple-marker',
						name: 'Multiple Marker',
					},
					{
						url: '/stisla/gmaps/route',
						name: 'Route',
					},
					{
						url: '/stisla/gmaps/simple',
						name: 'Simple',
					},
				],
			},
			{
				name: 'Modules',
				icon: 'monitor',
				items: [
					{
						url: '/modules/calendar',
						name: 'Calendar',
					},
					{
						url: '/modules/charts',
						name: 'ChartJS',
					},
					{
						url: '/modules/data-tables',
						name: 'DataTables',
					},
					{
						url: '/modules/flag',
						name: 'Flag',
					},
					{
						url: '/modules/ion-icons',
						name: 'Ion Icons',
					},
					{
						url: '/modules/owl-carousel',
						name: 'Owl Carousel',
					},
					{
						url: '/modules/sparkline',
						name: 'Sparkline',
					},
					{
						url: '/modules/sweet-alert',
						name: 'Sweet Alert',
					},
					{
						url: '/modules/toastr',
						name: 'Toastr',
					},
					{
						url: '/modules/vector-map',
						name: 'Vector Map',
					},
					{
						url: '/modules/weather-icon',
						name: 'Weather Icon',
					},
				],
			},
		],
	},
	{
		name: 'Pages',
		items: [
			{
				url: '',
				name: 'Auth',
				icon: 'user',
				items: [
					{
						url: '/pages/forgot-password',
						name: 'Forgot Password',
					},
					{
						url: '/pages/login',
						name: 'Login',
					},
					{
						url: '/pages/register',
						name: 'Register',
					},
					{
						url: '/pages/reset-password',
						name: 'Reset Password',
					},
				],
			},
			{

				name: 'Errors',
				icon: 'alert-triangle',
				items: [
					{
						url: '/errors/503',
						name: '503',
					},
					{
						url: '/errors/403',
						name: '403',
					},
					{
						url: '/errors/404',
						name: '404',
					},
					{
						url: '/errors/500',
						name: '500',
					},
				],
			},
			{
				name: 'Features',
				icon: 'gift',
				items: [
					{
						url: '/features/activities',
						name: 'Activities',
					},
					{
						url: '/features/posts/create',
						name: 'Post Create',
					},
					{
						url: '/features/posts',
						name: 'Posts',
					},
					{
						url: '/features/profile',
						name: 'Profile',
					},
					{
						url: '/features/settings',
						name: 'Settings',
					},
					{
						url: '/features/settings/detail',
						name: 'Setting Detail',
					},
					{
						url: '/features/tickets',
						name: 'Tickets',
					},
				],
			},
			{
				name: 'Settings',
				icon: 'settings',
				items: [

					{
						url: '/settings/theme',
						name: 'theme',
					},
					{
						url: '/settings/invoice',
						name: 'Invoice',
					},
					{
						url: '/settings/subscribe',
						name: 'Subscribe',
					},
				],
			},
			{
				url: '/credits',
				name: 'Credits',
				icon: 'pen-tool',
			},
		],
	},
]
