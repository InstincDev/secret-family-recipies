import{useEffect, useState} from "react"
const useLocalStorage = (key, defaultValue) => {
    // Create state variable to store 
    // localStorage value in state
    const setUpLocalStorage =() => {try {
            const value = localStorage.getItem(key)
            // If value is already present in 
            // localStorage then return it
             
            // Else set default value in 
            // localStorage and then return it
            if (value) {
                return JSON.parse(value)
            } else {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue
            }
        } catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue
        }}
    const [localStorageValue, setLocalStorageValue] = useState(setUpLocalStorage)
 
    useEffect(()=>{
        setLocalStorageValue(setUpLocalStorage())
    },[key])

    // this method update our localStorage and our state
    const setLocalStorageStateValue = (valueOrFn) => {
        let newValue;
        if (typeof valueOrFn === 'function') {
            const fn = valueOrFn;
            newValue = fn(localStorageValue)
        }
        else {
            newValue = valueOrFn;
        }
        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue)
    }
    return [localStorageValue, setLocalStorageStateValue]
}

export default useLocalStorage;


// export const getFromLocalStorage = (key, cache = null)=>{
//     const cache = localStorage.getItem(key)
    
//     if(!cache){
//         localStorage.setItem(key,cache)
//     }
//     return cache
// }

// const setToLocalStorage = (key,value)=>{
//     const value = localStorage.setItem(key,value)
    
//     if(!value){
//         return null
//     }
//     return value
// }



