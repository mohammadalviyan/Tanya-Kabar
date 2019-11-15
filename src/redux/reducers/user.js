const initialState = {
    user:{}
}

const userReducer = (state = initialState ,action) => {
    switch (action.type) {
        case "SET_USER" :
            console.log("REDUCERS DATA",action.payload)
            return {
                ...state,
                user : action.payload
            }

        default :
            return state
    }
}

export default userReducer;