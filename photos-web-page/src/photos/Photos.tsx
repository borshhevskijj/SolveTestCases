import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Loader } from './../Loader';
import cl from './photos.module.css'
import { Form } from '../form/Form';

import { Comments } from '../comments/Comments';


export interface Iphotos {
  id: number
  url: string
  comments?: {
    id: number
    text: string
    date: Date
  }
}

export const Photos = () => {
  const [photos, setPhotos] = useState<Iphotos[] | undefined>()
  const [currentLargePhoto, setCurrentLargePhoto] = useState<Iphotos | undefined>()
  const [comments, setComments] = useState<Iphotos['comments'][]>()
  // const [comments, setComments] = useState<any>()
  const [isActive, setIsActive] = useState(false)

  const getPhotos = async () => {
    const response = await axios.get('https://boiling-refuge-66454.herokuapp.com/images')
    setPhotos(response.data)
  }

  useEffect(() => {
    try {
      getPhotos()
    }
    catch (error) {
      alert(`ошибка - ${error}`)
    }

  }, [])

  const openModal = async (e: React.MouseEvent<HTMLElement>, id: number) => {
    try {
      const largePhoto = await axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
      setCurrentLargePhoto(largePhoto.data)
      setComments(largePhoto.data?.comments)
      setIsActive(true)
    }
    catch (error) {
      alert(`ошибка - ${error}`)
    }
  }

  return (
    <section className={cl.photoContainer}>
      {
        photos
          ? photos.map((photo: Iphotos) =>
            <img src={photo.url} key={photo.id} onClick={(e) => openModal(e, photo.id)} alt="" />)
          : <Loader />
      }

      {isActive &&
        <Modal isActive={isActive} setIsActive={setIsActive} children={
          <>
            <img style={{ borderRadius: '5px' }} key={currentLargePhoto?.id} src={currentLargePhoto?.url} alt="" />
            <Comments comments={comments!} />
            <Form photo={currentLargePhoto!} setComments={setComments} comments={comments} />
          </>
        }
        />
      }
    </section>
  )
}
