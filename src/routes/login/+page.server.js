import { invalid, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt'
import { db } from '$lib/database';
import fields from '$lib/forms/login.json'
import { validateFields } from '@delemercier/sveltekit-formly'

export const load = async () => {
    // todo
}

const login = async ({ cookies, request }) => {
    const data = await request.formData();
    const values = Object.fromEntries(data)
    const validation = validateFields(fields, values);

    if(!validation.valid) {
        return invalid(400, { errors: validation.details })
    }

    const { username, password }  = values;

    const user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        return invalid(400, { credentials: true })
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash)
    if(!userPassword) {
        return invalid(400, { credentials: true })
    }

    const authenticatedUser = await db.user.update({
        where: { username },
        data: { userAuthToken: crypto.randomUUID() }
    })

    cookies.set('session', authenticatedUser.userAuthToken, {
        path: '/', 
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30
    })

    throw redirect(302, '/')
}

export const actions = { login }