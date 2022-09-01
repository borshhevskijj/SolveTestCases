import React, { useState } from 'react'
import axios from 'axios'
import cl from './form.module.css'
import { Iphotos } from '../photos/Photos'

interface Iprops {
    photo: Iphotos
    // setComments: (comment: string) => void;
    setComments: any
    comments: any
}


const commentID = (arr: Array<Iprops['comments']>) => {
    if (arr.length) {
        return arr.at(-1).id
    }
    return 1
}

export const Form = ({ photo, setComments, comments }: Iprops) => {
    const [inputValue, setInputValue] = useState('')
    const [isValidForm, setIsValidForm] = useState(false)

    const inputHandler = (e: any) => {
        setInputValue(e.target.value)
        if (e.target.value <= 0) {
            setIsValidForm(false)
        }
        setIsValidForm(true)
    }


    const url = `https://boiling-refuge-66454.herokuapp.com/images/${photo.id}/comments`


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()




        const comment = {
            name: 'userName',
            comment: inputValue,
        }
        const headers = {
            "Content-type": "application/json; charset=UTF-8"
        }
        try {

            const response = await axios.post(url, comment, { headers })
            const res = JSON.parse(response.config.data)


            const copy = Object.assign([], comments);
            copy.push({
                id: commentID(comments),
                text: res.comment,
                data: Date.now()
            });
            setComments(copy)
            setInputValue('')
        } catch (error) {
            alert(error)
        }
    }

    console.log(comments[0].id, 'idd');

    return (
        <>
            <form
                className={cl.commentForm}
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >
                <input
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
