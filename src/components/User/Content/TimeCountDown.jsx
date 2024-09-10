import { useEffect, useState } from "react"

const TimeCountDown = (props) => {
    const [count, setCount] = useState(5);

    useEffect(() => {
        if(count === 0){
            props.handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        return () => {
            clearInterval(timer)
        }

    }, [count])

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours   = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60
    
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    return(
        <>
            {toHHMMSS(count)}
        </>
    )
}

export default TimeCountDown