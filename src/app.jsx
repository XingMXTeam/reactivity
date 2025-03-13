import { useState } from "react";
import createModel from "./create-model";

// foo/model.ts  构建时注册
function useModelFoo() {
  const [counter, setCounter] = useState(1);
  return {
    counter,
    setCounter,
  };
}

function useFieldsModel() {
  return {
    data: {
      title: "hello world",
    },
    setData: () => {},
  };
}

const getModel = (type) => {
  return createModel(() => {
    const map = {
      foo: useModelFoo(),
    };
    return {
      ...map[type],
    };
  });
};


const useModel = (type, selector) => {
  return getModel(type)(selector);
};

// function Bar({ useModel }) { 一般是在这里注入useModel
function Bar() {
  // 运行时注入
  const { counter, setCounter } = useModel("foo");
  return (
    <div>
      {counter} <button onClick={() => setCounter(counter + 1)}>设置</button>
    </div>
  );
}

export default function App() {
  return <Bar />;
}
