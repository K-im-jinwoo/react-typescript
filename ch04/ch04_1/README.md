## 04-1 처음 만나는 리액트 훅

> 리액트 훅이란?
> 

리액트 훅 함수는 반드시 함수 컴포넌트에서만 사용해야 하며, 컴포넌트 데이터 관리, 생명주기 대응, 

메서드 호출, 컴포넌트 간의 정보 공유등을 사용할 수 있다.

> 리액트 훅의 탄생 배경
> 

16.8 버전 이전에는 Component를 상속하고 render 메서드를 반드시 구현하는 클래스 기반 컴포넌트 였지만, 클래스에 많은 기능이 숨어 있어 코드가 직관적이지 않음. 

클래스 컴포넌트를 구현할 때 복잡함과 모호함을 극복할 목적으로 만들었다. 

> 리액트 훅 코드 패턴과 의존성 목록
> 

매개변수가 1개인 것과 2개인 것으로 나눌 수 있다.

| 개수 | 함수 |
| --- | --- |
| 1개 | useState, useRef, useImperativeHandle, useContext |
| 2개 | useMemo, useCallback, useReducer, useEffect, useLayoutEffect |

`매개변수 1개 : 훅_함수<값의 타입>(값)`

**ex)** `const today: Date = useRef<Date>(new Date)`

`매개변수 2개 : 훅_함수<값의 타입>(콜백 함수, 의존성 목록)`

**ex)** `useEffect(() ⇒ {} ,[])`

> setInterval API로 시계 만들기
> 

갱신 주기마다 콜백함수를 계속 호출해준다.

id값을 반환하는데 더이상 호출하지 않으려면 clearInterval API를 호출하면 된다. setInterval 은 시스템 메모리 자원을 사용하므로 반드시 clearInterval 함수를 호출하여 메모리 누수가 생기지 않게 해야한다.

App이 다시 렌더링될때마다 setInterval 호출이 발생하는 것을 막기위해 useEffect 훅 함수를 사용한다.

> useEffect 훅
> 

<aside>
💡 **useEffect 훅 사용법**
useEffect(콜백 함수, 의존성 목록)
콜백 함수 = () ⇒ {}

</aside>

useEffect는 의존성 목록에 있는 조건 중 어느 하나라도 충족되면 그때마다 콜백함수를 다시 실행한다.

한번만 실행하게 하려면 의존성 목록을 []로 만들면 된다. 콜백 함수를 한번만 실행

useEffect는 함수를 반환할 수 있다.

```tsx
export default function App() {
  let today = new Date()
  useEffect(() => {
    console.log('useEffect called.')
    const duration = 1000
    const id = setInterval(() => {
      today = new Date()
      console.log('today', today.toLocaleTimeString())
    }, duration)
    return () => clearInterval(id)
  },[])
  return <Clock today={today} />
}
```

```jsx
useEffect( () => {

return **() => {}** //컴포넌트 소멸 시 한번 실행
}, [])
```

time 변수가 정상적으로 갱신되ㅐ고 있지만 화면은 반영하지 못한다.

> useRef 훅 사용하기
> 

리액트 경고 메세지는 사리졌지만 1초간격으로 변경되는 변수값이 반영되지 않고 있다.

useRef훅은 컴포넌트를 다시 렌더링 하지 않기 때문이다.

```tsx
export default function App() {
  let today = useRef(new Date())
  useEffect(() => {
    console.log('useEffect called.')
    const duration = 1000
    const id = setInterval(() => {
      today.current = new Date()
      console.log('today.current', today.current.toLocaleTimeString())
    }, duration)
    return () => clearInterval(id)
  },[])
  return <Clock today={today.current} />
}
```

> useState 훅 사용하기
> 

useState가 반환하는 세터는 현재 값이 변경되면 자동으로 해당 컴포넌트를 다시 렌더링하는 기능이 있다. 

<aside>
💡 **useState 사용법**
const  [현재값, 세터] = useState(초기값)
세터 = (새로운 값) ⇒ void

</aside>

> 커스텀 훅이란?
> 

리액트 훅은 여러 훅 함수를 조합해 마치 새로운 훅 함수가 있는 것처럼 만들 수 있는데, 이러한 것을 커스텀 훅이라고 한다. 

훅 이라는 의미를 강조하고자 함수 이름에 use 라는 접두어를 붙여서 만든다.

```jsx
//useInterval 커스텀 훅 구현
import { useEffect } from "react";

export const useInterval = (callback: () => void, duration: number = 1000) => {
  useEffect(() => {
    const id = setInterval(callback, duration)
    return () => clearInterval(id)
  }, [callback, duration])
}
```

```jsx
//useClock 커스텀 훅 구현
import { useState } from "react";
import { useInterval } from "./useInterval";

export const useClock = () => {
  const [today, setToday] = useState(new Date())
  useInterval(()=>setToday(new Date()))
  return today
}
```

> 리액트 훅 함수의 특징
> 
1. 같은 리액트 훅을 여러 번 호출할 수 있다.
2. 함수 몸통이 아닌 몸통 안 복합 실행문의 {} 안에서 호출할 수 없다.
3. 비동기 함수를 콜백 함수로 사용할 수 없다.
