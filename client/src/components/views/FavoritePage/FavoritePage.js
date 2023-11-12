import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                //console.log(response.data)
                setFavorites(response.data.favorites)
            } else {
                alert('영화 정보 가져오기 실패!')
            }
        })
    } 

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite' , variables)
                .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Favorite 리스트 삭제 실패!')
                }
            })
        
    }

    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"   
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
    })


  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
  )
}

export default FavoritePage