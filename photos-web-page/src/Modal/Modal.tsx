import React, { useId } from 'react'
// import { Iphotos } from './../photos/Photos';
import cl from './modal.module.css'

interface IModalWindow {
  isActive: boolean
  setIsActive: (value: boolean) => void
  children: JSX.Element | JSX.Element[]
  // photo: Iphotos
}



export const Modal = ({ isActive, setIsActive, children }: IModalWindow) => {
  const uId = useId()
  // console.log(uId);


  return (
    <>

      <section key={uId} className={isActive ? cl.modalContainer + ' ' + cl.active : cl.modalContainer} onClick={(e) => setIsActive(false)}>
        <div key={uId} onClick={(e) => e.stopPropagation()} className={isActive ? cl.modalContent + ' ' + cl.active : cl.modalContent}>
          {children}
        </div>
      </section>

    </>





  )
}
