import React, { useEffect, useState } from 'react'
import {
	Container,
	TextField,
	Fab,
	Grid,
	FormControl,
	Card,
	Alert,
	CardContent,
	Typography,
	Chip,
	Avatar,
	Box,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RoomIcon from '@mui/icons-material/Room'
import './Search.css'
import axios from 'axios'

//url de api fake y rikolino
const CoUrl = 'http://127.0.0.1:8000/api/v1/jobs/'
const CoUrlT = 'http://127.0.0.1:8000/api/v1/companies/'

export default function Search() {
	const [data, setData] = useState([])
	const [Search, setSearch] = useState('')

	function getNameCompany() {
		return window.localStorage.getItem('name')
	}

	const peticionGet = async () => {
		await axios
			.get(CoUrl)
			.then((response) => {
				response.data.data.forEach((element) => console.log(element))
				setData(response.data.data)
			})
			.catch((error) => {
				console.log(error.message)
				Alert.fire({
					icon: 'error',
					title: 'Ups.. Algo salio mal!',
				})
			})
	}

	const handleSearch = (e) => {
		setSearch(e.target.value)
		filter(e.target.value)
		console.log(e.target.value)
	}

	const filter = (termSearch) => {
		let dataFiltered = data.filter((element) => {
			if (
				element.title
					.toLowerCase()
					.includes(termSearch.toLowerCase()) ||
				element.company.name
					.toLowerCase()
					.includes(termSearch.toLowerCase()) ||
				element.job_type
					.toLowerCase()
					.includes(termSearch.toLowerCase()) ||
				element.workplace
					.toLowerCase()
					.includes(termSearch.toLowerCase())
			) {
				return element
			} else {
				if (termSea) {
					console.log('entre')
					return element
				}
			}
		})
		setData(dataFiltered)
	}

	useEffect(async () => {
		await peticionGet()
	}, [])

	return (
		<>
			<Container maxWidth="sm">
				<br />
				<h1>Ubica un trabajo</h1>
				<Grid container spacing={1}>
					<Grid item>
						<FormControl sx={{ m: 1, minWidth: 400 }}>
							<TextField
								label="Puesto o Empresa"
								value={Search}
								placeholder="Ingresa el nombre del trabajo o la empresa"
								color="secondary"
								onChange={handleSearch}
								focused
							/>
						</FormControl>
						<FormControl sx={{ m: 1, minWidth: 50 }}>
							<Fab color="secondary" variant="extended">
								<SearchIcon sx={{ mr: 3 }} />
							</Fab>
						</FormControl>
					</Grid>
				</Grid>
			</Container>
			<div class="Principal">
				<Grid container spacing={1}>
					{data.map((job) => (
						<Card
							class="cardEmpleo"
							sx={{ maxWidth: 400, maxHeight: 500 }}
							key={job.id}
						>
							<CardContent>
								<Grid container spacing={3}>
									<Grid item xs={12} sm container>
										<Grid
											item
											xs
											container
											direction="column"
											spacing={2}
										>
											<Grid item xs>
												<Avatar
													alt="Remy Sharp"
													src={`http://127.0.0.1:8000${job.company.photo}/`}
													sx={{
														width: 56,
														height: 56,
													}}
												/>
												<Typography
													gutterBottom
													variant="h5"
												>
													{job.title}
												</Typography>
												<Typography
													variant="body1"
													color="text.primary"
												>
													Lugar de trabajo:{' '}
													{job.workplace}
												</Typography>
												<Typography
													variant="body1"
													color="text.primary"
												>
													Tipo de trabajo:{' '}
													{job.job_type}
												</Typography>
												<Typography
													variant="body1"
													color="text.primary"
												>
													Salario: ${job.salary}
												</Typography>
											</Grid>
											<Grid item>
												<Chip
													icon={<RoomIcon />}
													label={job.ubication}
													component="a"
													href="#"
													variant="outlined"
													clickable
												/>
												<Typography
													variant="body2"
													color="text.primary"
												>
													{job.description}
												</Typography>
											</Grid>
										</Grid>
										<Grid item>
											<Typography
												variant="subtitle1"
												component="div"
											>
												Empresa: {job.company.name}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					))}
				</Grid>
			</div>
		</>
	)
}
