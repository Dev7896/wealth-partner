export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your folder structure
    "./public/index.html", // For static files
  ],
  theme: {
  	extend: {
  		animation: {
  			fadeIn: 'fadeIn 1.5s ease-in-out',
  			slideInLeft: 'slideInLeft 1s ease-out',
  			slideInRight: 'slideInRight 1s ease-out',
  			scaleUp: 'scaleUp 1s ease-in-out',
  			bounceIn: 'bounceIn 1s ease-in-out',
  			fadeUp: 'fadeUp 1.5s ease-in-out',
  			zoomIn: 'zoomIn 1.5s ease-in-out'
  		},
  		keyframes: {
  			fadeIn: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			slideInLeft: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-50px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideInRight: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(50px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			scaleUp: {
  				from: {
  					opacity: '0',
  					transform: 'scale(0.8)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			bounceIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.8)'
  				},
  				'60%': {
  					opacity: '1',
  					transform: 'scale(1.1)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			fadeUp: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				},
  				AnimationTimeline: 'view(20%)'
  			},
  			zoomIn: {
  				from: {
  					opacity: '0',
  					transform: 'scale(0.5)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  		}
  	}
  },
  variants: {
    extend: {
      display: ['landscape'], // Example for display property
    },
  },
  plugins: [require("tailwindcss-animate")]
};