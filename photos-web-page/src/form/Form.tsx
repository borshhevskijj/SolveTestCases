import React, { useId, useState, useRef } from 'react'
import axios from 'axios'
import cl from './form.module.css'
import { Iphotos } from '../photos/Photos'

interface Iprops {
    photo: Iphotos
}


export const Form = ({ photo }: Iprops) => {
    const [inputValue, setInputValue] = useState('')
    const [isValidForm, setIsValidForm] = useState(false)
    let ref = useRef(null)


    const uId = useId()


    const inputHandler = (e: any) => {
        setInputValue(e.target.value)
        if (e.target.value <= 0) {
            setIsValidForm(false)
        }
        setIsValidForm(true)
    }

    const comment = {
        id: uId,
        text: inputValue,
        date: Date.now()
    }


    // const element = document.querySelector('#commentForm');
    const url = `https://boiling-refuge-66454.herokuapp.com/images/${photo.id}/comments`

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     try {
    //         const response = await axios.post(url, comment)
    //         console.log(response.data);

    //     } catch (error) {
    //         alert(error)
    //     }
    // }

    // const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //     console.log(`${photo.id} - id`);

    //     const xhr = new XMLHttpRequest()
    //     xhr.open("POST", url)
    //     xhr.send('qeqwr')
    //     xhr.onload! = function () { alert(`${xhr.status} - status`) }
    // }


    const handleSubmit = (e: any) => {
        e.preventDefault()

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                id: uId,
                text: inputValue,
                date: Date.now()
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log('response: ' + JSON.stringify(json));
            })

    }










    return (
        <>
            <form
                ref={ref}
                id='commentForm'

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

                <button
                    onSubmit={(e: any) => handleSubmit(e)}
                >
                    отправить</button>
            </form>
            {/* <div id='com' ref={ref}></div> */}
        </>

    )
}
