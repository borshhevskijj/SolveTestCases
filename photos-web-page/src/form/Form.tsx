import React, { useState, useId } from 'react'
import axios from 'axios'
import cl from './form.module.css'
import { Iphotos } from '../photos/Photos'

interface Iprops {
    photo: Iphotos
    setComments: any
    comments: any
    //  React.Dispatch<React.SetStateAction<({
    //     id: number | string;
    //     text: string;
    //     date: Date;
    // } | undefined)[] | undefined>>
}


export const Form = ({ photo, setComments, comments }: Iprops) => {
    const [inputValue, setInputValue] = useState('')
    const [isValidForm, setIsValidForm] = useState(false)
    const uID = useId()

    const inputHandler = (e: any) => {
        setInputValue(e.target.value)
        if (e.target.value <= 0) {
            setIsValidForm(false)
        }
        setIsValidForm(true)
    }

    const comment = {
        name: 'user',
        comment: inputValue,
    }

    const url = `https://boiling-refuge-66454.herokuapp.com/images/${photo.id}/comments`

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const headers = {
            "Content-type": "application/json; charset=UTF-8"
        }
        try {
            const response = await axios.post(url, comment, { headers })
            const res = await JSON.parse(response.config.data)

            const copy = Object.assign([], comments);
            copy.push({
                id: uID,
                text: res.comment,
                data: Date.now()
            });
            setComments(copy)
        } catch (error) {
            alert(error)
        }
    }


    return (
        <>
            <form
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >
                <input
                    onSubmit={(e) => e.preventDefault()}
                    type="text"
                    value={inputValue}
                    onChange={(e) => inputHandler(e)}
                    placeholder='комментировать...' />

                <button type='submit'> отправить</button>
            </form>
            {/* <div id='com' ref={ref}></div> */}
        </>

    )
}
