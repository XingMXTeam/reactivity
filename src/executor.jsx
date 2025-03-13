import { useRef, useEffect, useMemo } from "react"

export default function Executor({ hook,onUpdate }) {
    // React 的渲染机制：每当 Executor 组件的 hook 返回的 data 发生变化时，Executor 组件会重新渲染。
    const data = hook() // 执行自定义 hook
    const ref = useRef(false)
    useMemo(() => { onUpdate(data) }, [])

    // 任何数据变更都会触发更新
    useEffect(() => {
        if(ref.current) {
            onUpdate(data) // 数据变化时通知容器
        }
        else {
            ref.current = true
        }
    })
    return null
}