import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* fetch the data using the url coming from home component */
export let fetchData = createAsyncThunk(`data/fetchData`, async (url) =>
{
    const response = await axios.get(url);
    return response.data;
})

/* create slice that will be imported to the store to be usable globally*/
export let GallerySlice = createSlice({
    name: 'Gallery',
    initialState: {
        url: "",
        focusedShow: {},
        data: [],
        totalPages: 500,
        loading: true,
        error: false,
        showType: '',
        showSortByDate: '',
        id: 0,
        page: 1,
    },
    /* handle the respons coming from the thunk (fetching) depends in each case */
    extraReducers: (builder) =>
    {
        builder.addCase(fetchData.pending, (state, action) =>
        {
            state.totalPages = state.totalPages + 0
            state.page = state.page + 0
            state.error = false
            state.loading = true;
            state.data = []
            state.focusedShow = {}

        })
        builder.addCase(fetchData.fulfilled, (state, action) =>
        {
            if (action.payload.page <= 500)
            {
                state.page = action.payload.page
            } else
            {
                state.page = 500
            }

            if (action.payload.total_pages <= 500)
            {
                state.totalPages = action.payload.total_pages
            } else
            {
                state.totalPages = 500
            }
            state.loading = false;



            state.data = action.payload.results

            let newFocuedShow = state.data.find(object => state.id === object.id)
            if (newFocuedShow)
            {
                state.focusedShow = newFocuedShow
            } else
            {
                state.focusedShow = action.payload.results[0]
            }

            state.error = false

        })
        builder.addCase(fetchData.rejected, (action, state) =>
        {
            state.totalPages = state.totalPages + 0
            state.page = state.page + 0
            state.error = true
            state.loading = false;
            state.data = []
            state.focusedShow = {}
        })
    },
    reducers: {
        /* handle the next and prev page event to refetch data with the suitable url   */
        nextPage(state, action) 
        {

            if (state.page < state.totalPages)
            {
                if (state.showSortByDate === "Week")
                {
                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page + 1 }`
                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page + 1 }`

                    }
                } else
                {
                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page + 1 }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page + 1 }`

                    }

                }

            } else
            {

                if (state.showSortByDate === "Week")
                {
                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    }
                } else
                {
                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    }

                }
            }
            /* set  the value of page number to localStorage so that it will still have it's value after refreshing the page */
            if (state.page < 500)
            {

                window.localStorage.setItem('page-number', state.page + 1)
            } else
            {
                window.localStorage.setItem('page-number', 1)

            }


        },
        prevPage(state, action) 
        {

            if (state.page > 1)
            {
                if (state.showSortByDate === "Week")
                {
                    if (state.showType === "Movie")
                    {

                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page - 1 }`

                    } else
                    {

                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page - 1 }`

                    }
                } else
                {
                    if (state.showType === "Movie")
                    {

                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page - 1 }`

                    } else
                    {

                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.page - 1 }`

                    }

                }

            } else
            {
                if (state.showSortByDate === "Week")
                {
                    if (state.showType === "Movie")
                    {

                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.totalPages }`

                    } else
                    {

                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.totalPages }`

                    }
                } else
                {
                    if (state.showType === "Movie")
                    {

                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.totalPages }`

                    } else
                    {

                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ state.totalPages }`

                    }

                }

            }
            /* set  the value of page number to localStorage so that it will still have it's value after refreshing the page */
            if (state.page > 1)
            {

                window.localStorage.setItem('page-number', state.page - 1)
            } else
            {
                window.localStorage.setItem('page-number', state.totalPages)

            }

        },
        /* handle the current showed movie to be displayed above the others */
        handleFocusedShow(state, action)
        {
            let newFocuedShow = state.data.find(object => action.payload === object.id)
            state.id = action.payload
            state.focusedShow = newFocuedShow
        },
        /*check the value of show type(movies,series) and to update the url so it can be fetched   */
        handleShowType(state, action)
        {
            if (window.localStorage.getItem('show-type') === action.payload && window.localStorage.getItem('page-number'))
            {
                if (action.payload === "Movie")
                {
                    state.showType = "Movie"
                    if (state.showSortByDate === "Week")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`
                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`

                    }
                } else
                {
                    state.showType = "Series"
                    if (state.showSortByDate === "Week")
                    {
                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`

                    }
                }
            } else
            {
                if (action.payload === "Movie")
                {
                    state.showType = "Movie"
                    if (state.showSortByDate === "Week")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`
                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    }
                } else
                {
                    state.showType = "Series"
                    if (state.showSortByDate === "Week")
                    {
                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    }
                }

            }
            /*set  the value of show-type to localStorage so that will use it to check to use the stored page number or start from the first one  '*/
            window.localStorage.setItem('show-type', state.showType)

        },
        /*check the value of show date(relesed,upcoming) and to update the url so it can be fetched   */
        handleShowSortByDate(state, action)
        {

            if (window.localStorage.getItem('show-type-date') === action.payload && window.localStorage.getItem('page-number'))
            {

                if (action.payload === "Week")
                {
                    state.showSortByDate = "Week"
                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`

                    }
                } else
                {
                    state.showSortByDate = "Day"

                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ parseInt(window.localStorage.getItem('page-number')) }`

                    }

                }

            } else
            {
                if (action.payload === "Week")
                {
                    state.showSortByDate = "Week"
                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    }
                } else
                {
                    state.showSortByDate = "Day"

                    if (state.showType === "Movie")
                    {
                        state.url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    } else
                    {
                        state.url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`

                    }

                }

            }
            window.localStorage.setItem('show-type-date', state.showSortByDate)

        },
        /*return everything to the default */
        returnToHome(state, action)
        {
            state.showSortByDate = "Week"
            state.showType = "Movie"
            state.page = 1
            window.localStorage.setItem('page-number', 1)
            state.url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5fab7d76c9906ee191fbb1c1cede6934&language=en-US&page=${ 1 }`
        }


    }

})



export let galleryActions = GallerySlice.actions


