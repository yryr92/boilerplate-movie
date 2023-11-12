import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

//import { response } from 'express'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('실패!')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('favorited', response.data)
                    setFavorited(response.data.favorited)
                } else {
                    alert('실패!')
                }
            })

    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite' , variables)
                .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트 삭제 실패!')
                }
            })
        } else {
            Axios.post('/api/favorite/addToFavorite' , variables)
                .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트 추가 실패!')
                }
            })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite