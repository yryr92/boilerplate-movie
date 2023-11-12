import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCard from '../commons/GridCard'
import Favorite from './Favorite'
import { Row } from 'antd';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, SetMovie] = useState([])
    const [Casts, SetCasts] = useState([])
    const [ActorToggle, SetActorToggle] = useState(false)

    useEffect(() => {

        //console.log(props.match)

        //const endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                //console.log('movie', response)
                SetMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                //console.log('crew', response)
                SetCasts(response.cast)
            })

    }, [])

    const toggleActorView = () => {
        SetActorToggle(!ActorToggle)
    }


    return (
        <div>

            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

            <div style={{ width: '85%', margin: '1rem auto' }}>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite   movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>
                
                
                <MovieInfo
                    movie={Movie}
                />

                <br />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Action View</button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }

                

            </div>

        </div>
    )
}

export default MovieDetail