import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Loader } from './../Loader';
import cl from './photos.module.css'


export interface Iphotos {
  id: number
  url: string
  comments?: string[]
}

export const Photos = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentLargePhoto, setCurrentLargePhoto] = useState<Iphotos | undefined>(undefined)
  const [photos, setPhotos] = useState<Iphotos[] | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)



  const getPhotos = async () => {
    const response = await axios.get('https://boiling-refuge-66454.herokuapp.com/images')
      .then(res => res.data)
    setPhotos(response)
  }

  useEffect(() => {
    try {
      getPhotos()
    }
    catch (error) {
      alert(`ошибка - ${error}`)
    }

  }, [])



  const openModal = async (e: any, id: number) => {
    try {
      const largePhoto = await axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
        .then((res: any) => res.data)
      setCurrentLargePhoto(largePhoto)
      setIsActive(true)
      setIsLoaded(true)
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
            <img src={photo.url} key={photo.id} onClick={(e: any) => openModal(e, photo.id)} alt="" />)
          : <Loader />
      }
      <Modal isActive={isActive} setIsActive={setIsActive} children={
        <>
          <img src={currentLargePhoto?.url} alt="" />
          {
            !currentLargePhoto?.comments
            ?? currentLargePhoto.comments?.map((photo: string) => <p>{photo} </p>)
          }
        </>
      } />

    </section>
  )
}
