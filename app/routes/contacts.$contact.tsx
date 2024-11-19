import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";


export const loader = ({params}:LoaderFunctionArgs) => {

    const contactId = params.contact

    return contactId ?? 'kontaktin id puuttuu'

}

export const action = async ({request}: ActionFunctionArgs )=>{

    const data = await request.formData()

    const {username, password} = Object.fromEntries(data)

    if(!username || !password){

        return "Tarkista käyttänimi ja salasana"

    }

    console.log(username, password)

    return redirect("/")
}

export default function Contact(){

    const contactId = useLoaderData<typeof loader>()
    const errorMsg = useActionData<typeof action>()


    return <div className="flex flex-col justify-around h-[200px] ">

        { errorMsg ?? errorMsg }

        <Form method="post" className="flex flex-col">
            <label htmlFor="username">Käyttäjänimi</label>
            <input id="username" type="text" name="username" />
            <label htmlFor="">Salasana</label>
            <input type="password" name="password"/>
            <button type="submit" className="h-12 bg-green-500 mt-4 hover:bg-green-400">Tallenna</button>
        </Form>

    </div>

}