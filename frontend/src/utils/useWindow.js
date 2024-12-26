import { useEffect, useState } from "react"

export const useWindow = ()=>{
    const [size,setSize] = useState([0,0]);

    useEffect(()=>{
        const updateSize = ()=>{
            setSize([window.innerWidth , window.innerHeight])
        }
         window.addEventListener('resize',updateSize);

         return ()=> window.removeEventListener('resize',updateSize);
    },[])

    return {
        width : size[0],
        heigth : size[1]
    }
}