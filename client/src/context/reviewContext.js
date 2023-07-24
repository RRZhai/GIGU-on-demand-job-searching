import { useEffect, useReducer, createContext } from "react"

const ReviewContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(review => review.id === action.payload.id ? 
                            action.payload : review)
        case "remove":
            return state.filter(review => review.id !== action.payload.id)
        default:
            return state;
    }
}

const ReviewProvider = ({ children }) => {
    const [reviews, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch('/reviews')
        .then(resp => {
            resp.json().then(data => {
                if (resp.ok){
                    dispatch({
                        type:'fetch',
                        payload:data
                    })
                } else {
                    throw new Error('Can not render reviews!')
                }
            })
        }).catch(error => alert(error))
    }, [])

    return (
        <ReviewContext.Provider value={{ reviews, dispatch }}>
            { children }
        </ReviewContext.Provider>
    )
}

export { ReviewContext, ReviewProvider }