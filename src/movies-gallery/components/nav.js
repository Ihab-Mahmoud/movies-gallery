import { useDispatch } from "react-redux"
import { galleryActions } from "../store/shows-gallery-slice"
import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"


let Header = () =>
{
    const firstSelect = useRef(null)
    const secondSelect = useRef(null)
    const dispatch = useDispatch()

    /* set the values of filter to localStorage so that it will still have the same values after refreshing the page */
    useEffect(() =>
    {
        if (window.localStorage.getItem("firstSelect"))
        {
            handleShowSortByDate(window.localStorage.getItem("firstSelect"))
            firstSelect.current.value = window.localStorage.getItem("firstSelect")
        }
        if (window.localStorage.getItem("secondSelect"))
        {
            handleShowType(window.localStorage.getItem("secondSelect"))
            secondSelect.current.value = window.localStorage.getItem("secondSelect")
        }
    }, [])

    /*send the values of the filter to the reducer  */
    let handleShowType = (value) =>
    {
        dispatch(galleryActions.handleShowType(value))
    }
    let handleShowSortByDate = (value) =>
    {
        dispatch(galleryActions.handleShowSortByDate(value))
    }
    
    /*return everything to the default */

    let returnToHome = () =>
    {
        window.localStorage.setItem("firstSelect", "Week")
        window.localStorage.setItem("secondSelect", "Movie")
        dispatch(galleryActions.returnToHome())
    }
    return <div id="header" className="header">
        <div className="logo">
            <a onClick={() => { returnToHome() }} href="/" ><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="logo" />
            </a>
        </div>
        <div className="title">
            Trending Movies & Series
        </div>
        <div className="filter">
            <select ref={firstSelect} onChange={(e) => { handleShowSortByDate(e.target.value); window.localStorage.setItem("firstSelect", e.target.value) }}>
                <option style={{ backgroundColor: "black" }} value="Week">Released</option>
                <option style={{ backgroundColor: "black" }} value="Day">upcoming</option>
            </select>
            <select ref={secondSelect} onChange={(e) => { handleShowType(e.target.value); window.localStorage.setItem("secondSelect", e.target.value) }}>
                <option style={{ backgroundColor: "black" }} value="Movie">Movies</option>
                <option style={{ backgroundColor: "black" }} value="Series">Series</option>
            </select>
        </div>

    </div>
}


export default Header;