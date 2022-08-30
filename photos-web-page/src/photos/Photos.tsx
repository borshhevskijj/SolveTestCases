import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Loader } from './../Loader';
import cl from './photos.module.css'
import { Form } from '../form/Form';

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
    // .then(res => res.data)
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



  const openModal = async (e: any, id: number) => {
    try {
      const largePhoto = await axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
      // .then((res: any) => {
      // res.data
      setCurrentLargePhoto(largePhoto.data)
      setComments(largePhoto.data?.comments)
      setIsActive(true)
      // })
      // console.log(largePhoto.data);

    }
    catch (error) {
      alert(`ошибка - ${error}`)
    }
  }
  const obj = {
    id: 152,
    text: 'string',
    date: 1243242352
  }
  // console.log(currentLargePhoto?.comments);
  // setComments(comments.push(obj))
  console.log(comments);



  return (
    <section className={cl.photoContainer}>
      {
        photos
          ? photos.map((photo: Iphotos) =>
            <img src={photo.url} key={photo.id} onClick={(e: any) => openModal(e, photo.id)} alt="" />)
          : <Loader />
      }

      {isActive &&
        <Modal isActive={isActive} setIsActive={setIsActive} children={
          <>

            {/* {console.log(currentLargePhoto, 'qwerqw')} */}
            <img key={currentLargePhoto?.id} src={currentLargePhoto?.url} alt="" />
            {


              comments!.map((comment: any) => {
                // console.log(currentLargePhoto?.id, 'qwe');
                return (
                  <>
                    <div key={comment.id}>{comment.text}</div>
                  </>
                )
              })
            }



            <Form photo={currentLargePhoto!} setComments={setComments} comments={comments} />



          </>
        }
        />
      }


    </section>
  )
}
