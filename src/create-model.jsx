import { createRoot } from 'react-dom/client';
import { useState, useRef, useEffect, useMemo } from 'react';
import Container from './container'
import Executor from './executor'
import compare from './util';

export default function createModel(hook, context) {
    const container = new Container(hook)
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(
        <Executor
            onUpdate={v => {
                container.data = v
                container.notify()
            }}
            hook={() => hook()}
        />, div
    )

    const useModel = selector => {
        const [state, setState] = useState(() => selector ? selector(container.data) : container.data)
        const stateRef = useRef(state)
        const subscriber = useMemo(() => {
            function subscriber(val) {
                if (!selector) {
                    setState(val);
                } else {
                    const oldState = stateRef.current;
                    const newState = selector(val);
                    if (!compare(oldState, newState)) {
                        setState(newState);
                    }
                    stateRef.current = newState;
                }
            }

            container.subscribers.add(subscriber);
            return subscriber;
        }, [container]);

        // 组件卸载时移除订阅者
        useEffect(() => {
            container.subscribers.delete(subscriber)
        }, [subscriber])

        return state
    }
    return useModel
}