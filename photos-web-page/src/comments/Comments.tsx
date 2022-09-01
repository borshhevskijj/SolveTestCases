import React from 'react'
import cl from './comments.module.css'
import { Iphotos } from '../photos/Photos'


interface Iprops {
    comments: Iphotos['comments'][]
}

export const Comments = ({ comments }: Iprops) => {
    return (

        <section className={cl.commentsArea}>
            {comments!.length
                ? comments!.map((comment: Iphotos['comments']) => {
                    console.log(comment!.id, 'idd');
                    return (
                        <div className={cl.comment} key={comment!.id}>{comment!.text}</div>
                    )
                })
                : <div style={{ padding: '15px 0 15px 10px' }}>комментариев нет</div>
            }
        </section>

    )
}
