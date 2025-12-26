/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f0f7ff',
  				'100': '#e0efff',
  				'200': '#b9dfff',
  				'300': '#7cc4ff',
  				'400': '#36a9ff',
  				'500': '#0f90ff',
  				'600': '#0071e6',
  				'700': '#0057b3',
  				'800': '#004999',
  				'900': '#003d80',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f5f6f7',
  				'100': '#ebedef',
  				'200': '#d1d6dc',
  				'300': '#b7bfc9',
  				'400': '#8491a3',
  				'500': '#6b7a8f',
  				'600': '#556275',
  				'700': '#444e5f',
  				'800': '#3a424f',
  				'900': '#333944',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Open Sans',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'Roboto',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			soft: '0 2px 10px rgba(0, 0, 0, 0.05)',
  			medium: '0 4px 20px rgba(0, 0, 0, 0.1)'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					color: '#333944',
  					maxWidth: '65ch',
  					h1: {
  						fontFamily: 'Roboto, system-ui, sans-serif',
  						fontWeight: '700'
  					},
  					h2: {
  						fontFamily: 'Roboto, system-ui, sans-serif',
  						fontWeight: '600'
  					},
  					h3: {
  						fontFamily: 'Roboto, system-ui, sans-serif',
  						fontWeight: '600'
  					},
  					'article p': {
  						fontFamily: 'Open Sans, system-ui, sans-serif',
  						fontSize: '1.125rem',
  						lineHeight: '1.75'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
],
}