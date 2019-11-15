export const setUser = (id, name, email, job) => ({
    type : "SET_USER",
    payload : {id, name, email, job}
})

export const setUserNull = () => ({
    type : "SET_USER",
    payload : {}
})