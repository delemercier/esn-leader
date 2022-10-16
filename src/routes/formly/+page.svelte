<script>
	import { valuesForm, Field } from '@delemercier/sveltekit-formly'

	import fields from '$lib/forms/fields.json'
	let messages = {
		myrule: 'Field required custom {1}'
	};

	let classes = {
		message: 'error-message',
		section: 'text-xl',
		checkbox: 'color-orange',
		input: '',
		autocomplete: {},
		table: {
			addrowtext: '+',
			deleterowtext: '✖'
		}
	};

	let apiResult = {};

</script>

<form style="display:inline-block; width:50%" action="?/login" method="POST">
	<Field {fields} {messages} {classes} action="new" />
	<button type="submit" disabled={!$valuesForm.valid}>Submit</button>
</form>

<div style="display:inline-block; width:45%;vertical-align:top;margin-left:30px">
	<h2>Data produced</h2>
	<pre>{JSON.stringify($valuesForm, null, 2)}</pre>

	<h2>Data after submit POST /add</h2>
	<pre>{JSON.stringify(apiResult, null, 2)}</pre>
</div>

<style>
	:global(.text-xl) {
		font-size: 2em;
	}

	:global(.error-message) {
		color: red;
		font-size: 0.8em;
	}

	:global(.formly-required) {
		border: 1px orange solid;
	}

	:global(input[type='checkbox'].formly-required) {
		border: 1px orange solid;
		box-shadow: inset 1em 1em orange;
	}
</style>
