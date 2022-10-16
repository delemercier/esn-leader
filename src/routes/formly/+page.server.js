import fields from '$lib/forms/fields.json'
import { validateFields } from '@delemercier/sveltekit-formly'
import { invalid, redirect } from '@sveltejs/kit'

export const load = async () => {
    // todo
}

const login = async ({ request }) => {
    const data = await request.formData();
    const values = Object.fromEntries(data)
    const validation = validateFields(fields, values);

    console.log(values)
    //console.log(validation)
    if(!validation.valid) {
        return invalid(400, { errors: validation.details })
    }

    throw redirect(302, '/formly')
}

export const actions = { login }