import { useEffect} from 'react';
import ShowCard from "./show-card";
import { useSelector, useDispatch } from "react-redux"
import { galleryActions } from "../store/shows-gallery-slice"
import { fetchData } from "../store/shows-gallery-slice"
import {  useParams } from "react-router-dom"

let Home = () =>
{
    const { id } = useParams()
    const dispatch = useDispatch()
    let page = useSelector((state) => state.gallery.page)
    let data = useSelector((state) => state.gallery.data)
    let error = useSelector((state) => state.gallery.error)
    let loading = useSelector((state) => state.gallery.loading)
    let url = useSelector((state) => state.gallery.url)
    let totalPages = useSelector((state) => state.gallery.totalPages)
    let showSortByDate = useSelector((state) => state.gallery.showSortByDate)
    let focusedShow = useSelector((state) => state.gallery.focusedShow)

    /* handle the current showed movie*/
    useEffect(() =>
    {
        dispatch(galleryActions.handleFocusedShow(parseInt(id)))
    }, [id])

    /*fetch the default page just in case the id is undefined*/

    useEffect(() =>
    {
        if (!id)
        {
            dispatch(fetchData("https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=1"))
        }

    }, [])
    
    /*fetch everytime the coming url changes*/

    useEffect(() =>
    {
        dispatch(fetchData(url))
    }, [url])
    let nextPage = () =>
    {
        dispatch(galleryActions.nextPage())
    }
    let prevPage = () =>
    {
        dispatch(galleryActions.prevPage())
    }


    return <>
        <div className="landing" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${ focusedShow.backdrop_path })` }}>
            <div className="show-details">
                <div className="realse-date">
                    {focusedShow.release_date === undefined ? <span>{focusedShow.first_air_date}</span> : <span>{focusedShow.release_date}</span>}
                    {showSortByDate === "Week" ? <span>Released</span> : <span>Upcoming</span>}
                </div>
                {focusedShow.title === undefined ? <h2>{focusedShow.name}</h2> : <h2>{focusedShow.title}</h2>}
                <h3>Feel the need... The need for speed.</h3>
                <p>{focusedShow.overview}</p>
                <div className="show-categories">
                    <ul>
                        <li>Action</li>
                        <li>Action</li>
                        <li>Action</li>
                        <li>Action</li>
                    </ul>
                </div>
                <div className="runtime-budget">
                    <span>Runtime: 130 mins</span>
                    <span>Budget: $68000000</span>
                </div>
                <div className="rating-language">
                    <span>Rating: {focusedShow.vote_average}</span>
                    <span>Language: {focusedShow.original_language}</span>
                </div>
            </div>
            <div className="poster">
                <img src={`https://image.tmdb.org/t/p/w500/${ focusedShow.poster_path }`} alt="poster"></img>
            </div>
        </div>
        {loading && <h2>Loading...</h2>}
        {error && <h2> Something went wrong</h2>}
        <div className="cards">
            {
                data.map(show =>
                {

                    return <ShowCard key={show.id} {...show} />
                })
            }
        </div>

        <div className="change-page">
            <button onClick={() => { prevPage(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}  >Back</button>
            <span>Page: {page}/{totalPages}</span>
            <button onClick={() => { nextPage(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Next</button>
        </div>
    </>



}


export default Home;