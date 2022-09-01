import React from 'react'
// import { Iphotos } from './../photos/Photos';
import cl from './modal.module.css'

interface IModalWindow {
  isActive: boolean
  setIsActive: (value: boolean) => void
  children: JSX.Element | JSX.Element[]
}



export const Modal = ({ isActive, setIsActive, children }: IModalWindow) => {
  return (
    <>
      <section className={isActive ? cl.modalContainer + ' ' + cl.active : cl.modalContainer} onClick={(e) => setIsActive(false)}>
        <div onClick={(e) => e.stopPropagation()} className={isActive ? cl.modalContent + ' ' + cl.active : cl.modalContent}>
          {children}
        </div>
      </section>
    </>





  )
}
