import { useEffect, useReducer, createContext } from "react"

const HireContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(hire => hire.id === action.payload.id ? 
                            action.payload : hire)
        case "remove":
            return state.filter(hire => hire.id !== action.payload.id)
        default:
            return state;
    }
}

const HireProvider = ({ children }) => {
    const [hires, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch('/hires')
        .then(resp => {
            resp.json().then(data => {
                if (resp.ok){
                    dispatch({
                        type:'fetch',
                        payload:data
                    })
                } else {
                    throw new Error('Can not render hires!')
                }
            })
        }).catch(error => alert(error))
    }, [])

    return (
        <HireContext.Provider value={{ hires, dispatch }}>
            { children }
        </HireContext.Provider>
    )
}

export { HireContext, HireProvider }