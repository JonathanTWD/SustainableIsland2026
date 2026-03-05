import { Button } from './Componentsv1/Button/Button'
import { Header } from './Componentsv1/Header/Header'
import { Nav } from './Componentsv1/Nav/Nav'
import { Slider } from './Componentsv1/Slider/Slider'

function App() {

	return (
		<>
			<Header />

			<Button text="Log in" onClick={() => alert('You are now logged in!')} />
			<Button text="Sign up" onClick={() => alert('You are now signed up!')} />

			<Slider />

			<Nav />
		</>
	)
}

export default App
