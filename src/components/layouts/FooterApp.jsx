import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary">
			{'Todos Los Derechos Reservados © '}
			<Link
				color="inherit"
				href="https://uptapachula.edu.mx/page/"
				target="_blank"
			>
				Universidad Politecnica de Tapachula
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default function FooterApp() {
	return (
		<footer>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '41vh',
				}}
			>
				<CssBaseline />
				<Box
					component="footer"
					sx={{
						py: 3,
						px: 2,
						mt: 'auto',
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? theme.palette.grey[200]
								: theme.palette.grey[810],
					}}
				>
					<Container maxWidth="sm">
						<Typography variant="body1">
							Proyecto Integrador
						</Typography>
						<Copyright />
					</Container>
				</Box>
			</Box>
		</footer>
	)
}
