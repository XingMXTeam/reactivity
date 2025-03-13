import { useRef, useEffect, useMemo } from "react"

export default function Executor({ hook,onUpdate }) {
    const data = hook()
    const ref = useRef(false)
    useMemo(() => { onUpdate(data) }, [])
    useEffect(() => {
        if(ref.current) {
            onUpdate(data)
        }
        else {
            ref.current = true
        }
    })
}