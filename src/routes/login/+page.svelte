<script>
	import { enhance } from '$app/forms';
	import fields from '$lib/forms/login.json'
	import { Field } from '@delemercier/sveltekit-formly'
	export let form;

	let classes = {
		input: 'input-primary',
		message: 'text-sm text-error my-1'
	};
</script>

<form class="m-3" action="?/login" method="POST" use:enhance>
	<Field {fields} {classes} action="new" />
	<button class="btn my-2" type="submit">Log in</button>
	{#if form?.credentials}
		<p class="text-error">Wrong credentials</p>
	{/if}
</form>

