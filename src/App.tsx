// @ts-nocheck
import React from 'react';
import axios from 'axios';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import russia from './assets/russia.png';
import usa from './assets/united-states.png';
import germany from './assets/germany.png';
import france from './assets/france.png';
import button from './assets/refresh-button.png';
import './styles/links.css';
import './styles/buttondata.scss';
import Radio from '@mui/material/Radio';
import { motion } from 'framer-motion/dist/framer-motion';



function App() {

	let [responseData, setResponseData] = React.useState('');

	// const [language, setLanguage] = React.useState(['en'])
	const saved = localStorage.getItem("language");
	const initialValue = JSON.parse(saved) || 'en';


	const [language, setLanguage] = React.useState(initialValue || 'en');




	localStorage.setItem("language", JSON.stringify(language));

	const handleChange = (event: any) => {
		setLanguage(event.target.value);
		// @ts-ignore
		window.location.reload(true);
	};

	const controlProps = (item: any) => ({
		checked: language === item,
		onChange: handleChange,
		value: item,
		name: 'color-radio-button-demo',
		inputProps: { 'aria-label': item },

	});


	interface quotesTypes {
		content: string,
		originator: string
	}


	const fetchData = React.useCallback(() => {
		axios({
			"method": "GET",
			"url": "https://quotes15.p.rapidapi.com/quotes/random/",
			"headers": {
				"content-type": "application/octet-stream",
				"x-rapidapi-host": "quotes15.p.rapidapi.com",
				"x-rapidapi-key": 'c232c6ccd4msh0bcf1216baa6af8p1baf68jsnf2c8ea66b4db'
			}, "params": {
				"language_code": `${language}`
			}
		})
			.then((response) => {
				setResponseData(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [language])

	React.useEffect(() => {
		fetchData()
	}, [fetchData])





	return (
		<>
				<AppBar position="static" color='warning'>
					<Toolbar>

						<Typography variant="h4" style={{ fontWeight: '600' }} component="div" sx={{ flexGrow: 1 }}>
							DAGHLARYAN ණ
						</Typography>
						<div className='flags'>
							<img src={usa} style={{ width: '30px' }} alt='usa' />
							<Radio {...controlProps('en')} />
							<img src={russia} style={{ width: '30px' }} alt='russia' />
							<Radio {...controlProps('ru')} color="secondary" />
							<img src={germany} style={{ width: '30px' }} alt='ger' />
							<Radio {...controlProps('de')} color="success" />
							<img src={france} style={{ width: '30px' }} alt='fra' />
							<Radio {...controlProps('fr')} color="default" />
						</div>
					</Toolbar>
				</AppBar>

			<div className="App">

					<header className="App-header">
						<h1>
							↧
						</h1>
						<button className='buttondata' type='button' onClick={fetchData}><img src={button} style={{ width: '50px' }} alt='button' /></button>
					</header>

					<main>
						{responseData &&
							<blockquote>

								“{responseData.content}”
								<small><a href={responseData.originator.url} style={{ textDecoration: 'none', color: 'white', fontWeight: '600' }}>{responseData.originator.name}<span role='img' aria-label='lamp'>💡</span></a></small>
							</blockquote>
						}
					</main>

					<footer className='footer' style={{ marginBottom: '5%' }}>
						<div className="wrapper">
							<a href='https://github.com/gevorg-daghlaryan' style={{ color: 'orange' }}>
								<div className="icon github">
									<div className="tooltip">Github</div>
									<span><i className="fab fa-github"></i></span>
								</div>
							</a>
						</div>
					</footer>
			</div>
		</>
	);
}

export default App;