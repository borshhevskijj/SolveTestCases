import axios from 'axios';
import React, { useState, useEffect } from 'react';


interface Iphotos {
  id: number
  url: string
}
export const Photos = () => {

  useEffect(() => {
    try {
      axios.get('https://boiling-refuge-66454.herokuapp.com/images')
        .then(res => {
          const respons = res.data
          setPhotos(respons)
        })

    } catch (error) {
      alert(`ошибка - ${error}`)
    }

  }, [])

  const [photos, setPhotos] = useState<Iphotos[] | undefined>()


  return (
    <>
      {
        photos ?
          photos.map((photo: Iphotos) =>
            <img src={photo.url} key={photo.id} alt="" />
          )
          : <p>ничего не найдено</p>
      }
    </>
  )
}
