<script>
	import Navbar from './Navbar.svelte';
	import {preferences} from '../store.js'
	import '../app.postcss';
	import Footer from './Footer.svelte';
</script>

<main data-theme={$preferences.theme} class="flex flex-col min-h-screen">
	<Navbar />

	<div class="grow">
		<slot />
	</div>


	<Footer/>
</main>
