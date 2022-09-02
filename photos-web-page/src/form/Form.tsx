import React, { useState } from 'react'
import axios from 'axios'
import cl from './form.module.css'
import { Iphotos } from '../photos/Photos'

interface Iprops {
    photo: Iphotos
    setComments: any
    comments: any
}


const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(0);


export const Form = ({ photo, setComments, comments }: Iprops) => {
    const [inputValue, setInputValue] = useState('')

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }





    const url = `https://boiling-refuge-66454.herokuapp.com/images/${photo.id}/comments`
    const comment = {
        name: 'userName',
        comment: inputValue,
    }
    const headers = {
        "Content-type": "application/json; charset=UTF-8"
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post(url, comment, { headers })
            const res = JSON.parse(response.config.data)

            const copy: Iphotos['comments'][] = Object.assign([], comments);
            copy.push({
                id: uid(),
                text: res.comment,
                date: Date.now()
            });
            setComments(copy)
            setInputValue('')
        } catch (error) {
            alert(error)
        }
    }


    return (
        <>
            <form
                className={cl.commentForm}
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >
                <input
                    required
                    onSubmit={(e) => e.preventDefault()}
                    onChange={(e) => inputHandler(e)}
                    value={inputValue}
                    className={cl.formInput}
                    type="text"
                    placeholder='комментировать...' />
                <button
                    type='submit'
                    className={cl.submitBtn}
                >отправить</button>
            </form>
        </>

    )
}
