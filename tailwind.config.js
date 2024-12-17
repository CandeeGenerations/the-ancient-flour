/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme')
const animate = require('tailwindcss-animate')
const colors = require('tailwindcss/colors')
const forms = require('@tailwindcss/forms')
const typography = require('@tailwindcss/typography')
const aspectRatio = require('@tailwindcss/aspect-ratio')

module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'Noto Sans',
                    ...defaultTheme.fontFamily.sans
                ],
  			serif: [
  				'Cormorant',
                    ...defaultTheme.fontFamily.serif
                ]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)',
                    ...colors.indigo
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)',
                    ...colors.indigo
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))',
  				lightest: '#eabcbd',
  				light: '#dd9091',
  				mid: '#bb2124',
  				medium: '#951a1c',
  				dark: '#701315'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
  				lightest: 'colors.slate['50'],
  				'light-medium': 'colors.slate['100'],
  				light: 'colors.slate['300'],
  				mid: 'colors.slate['500'],
  				medium: 'colors.slate['700'],
  				dark: 'colors.slate['900']
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			dark: {
  				DEFAULT: '#3A415C'
  			},
  			success: {
  				lightest: '#bceac1',
  				light: '#90dd99',
  				DEFAULT: '#22BB33',
  				medium: '#1b9528',
  				dark: '#14701e'
  			},
  			warning: {
  				lightest: '#fae6c9',
  				light: '#f7d6a6',
  				DEFAULT: '#f0ad4e',
  				medium: '#c08a3e',
  				dark: '#90672e'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: '`var(--radius)`',
  			md: '`calc(var(--radius) - 2px)`',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontSize: {
  			base: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [forms, typography, aspectRatio, animate],
}
