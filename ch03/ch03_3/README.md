## 03-3 CSS 상자 모델 이해하기

div의 height를 명시적으로 표현

```tsx
<section className="mt-4">
      <Title>DivTest</Title>
      <Div className="text-center text-blue-100 bg-blue-600" height="6rem">
        <Icon name="home" className="text-3xl"></Icon>
        <Subtitle>Home</Subtitle>
      </Div>
    </section>
```

명시적으로 설정하지 않고 웹 브라우저의 높이 결정 메커니즘을 적용하는 방법

콘텐츠를 정확하게 감싸는 높이로 계산된 값을 가진다. 

CSS에서는 높이를 명시적으로 설정하지 않고 브라우저가 계산하도록 구현하는 것이 바람직하다.

| box-border | box-sizing: border-box |
| --- | --- |
| box-content | content-box |
|  |  |

> 캐스케이딩
> 

위 코드에서 아이콘과 텍스트의 색상값을 각각 설정하지 않고, 두 컴포넌트의 부모컴포넌트인 Div에 설정했다 이것이 CSS의 캐스케이딩

Cascading → 위에서 아래로 물이 계단을 따라 흘러내린다 라는 의미

width와 같은 스타일 속성에도 적용

> 뷰포트
> 

웹 페이지에서 사용자가 볼 수 있는 영역, 웹 브라우저가 동작하는 장치의 화면 크기가 각각 달라서 생긴 개념

| w-screen | 100vw |
| --- | --- |
| h-screen | 100vh |
| w-full | 100% |
| h-full | 100% |

w-full과 h-full은 부모요소 기준

> 테일윈드 CSS의 길이 관련 클래스
> 

**정확한건 테일윈드CSS 공식문서 참고할것** 

`w-숫자`

`w-분자/분모`

`h-숫자`

`h-분자/분모`

여기서 숫자의 단위는 rem 기준은 4로, w-4는 1rem 숫자가 1씩 증가나 감소할 때 0.25rem 씩 증가난 감소한다. 

> padding 스타일 속성
> 

`p-숫자`

`p(x | y | t | l | b | r)- 숫자`

p-8 즉 M문자 2개만큼 간격을 두고 텍스트가 표시된다. 

```tsx
<section className="mt-4">
      <Title>PaddingTest</Title>
      <div className="p-8">
        <div className="text-white bg-sky-600">
          <p>{ sentence }</p>
        </div>
        <div className="p-8 text-white bg-orange-600">
          <p>{sentence}</p>
        </div>
      </div>
      <div className="mt-4"></div>
    </section>
```

> margin 스타일 속성
> 

`m-숫자`

`m(x | y | t | l | b | r) - 숫자 | 분자/분모`

> background-image 스타일 속성
> 

```tsx
<section className="mt-4">
      <div className="mt-4">
      <Title>ImageTest</Title>
        <img src={src} className="bg-gray-300" width="400" height="400" alt="" />
      </div>
    </section>
```

width와 height를 주면 이미지의 높이가 줄어드는 현상을 볼 수 있다. 이는 이미지가 왜곡되어 보이지 않도록 웹 브라우저가 화면 비율을 고려해 height 값을 계산했기 때문이다. 

이러한 특성때문에 background-image 속성을 선호함

이미지의 URL을 매개변수로 사용하는 형태로 사용하는데 타입스크립트 코드에서 결정하려고 할 때 조금 번거롭다. 

Div 에 추가한 코드

```tsx
import type { HTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from "react";
import type { WidthHeight } from "./WidthHeight";

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export type DivProps = ReactDivProps & PropsWithChildren<WidthHeight> & {
  src?: string
};

export const Div: FC<DivProps> = ({
  width, height, style: _style, src,className: _className , ...props
}) => {
  const style = { ..._style, width, height, backgroundIMage: src && `url(${src})` }
  const className = ['box-sizing', src && 'bg-gray-300', _className].join(' ')
  return <div {...props} className={ className } style={style} />
}
```

> background-size 스타일 속성
> 

| bg-auto | auto |
| --- | --- |
| bg-cover | cover |
| bg-contain | bg-contain |

보통은 bg-cover

> border 스타일 속성
> 

| border | border-width |
| --- | --- |
| border-t | top |
| border-r | right |
| border-b | bottom |
| border-l | left |

| border-solid | solid |
| --- | --- |
| border-dashed | dashed |
| border-dotted | dotted |
| border-double | double |
| border-none | none |

그외 등등 찾아보기

> Avatar 컴포넌트 만들기
> 

테일윈드CSS는 -ml-6 처럼 마이너스 기호를 붙여 음수 margin값을 설정할 수 있다.

```tsx
import { Div, Title, Avatar } from "../components";
import * as D from "../data";

export default function AvatarTest() {
  const avatars = D.range(0, 10).map((index) => (
    <Avatar
      className="inline-block -ml-6 border-4 border-white"
      key={index}
      src={D.randomAvatar()}
    />
  ));
  return (
    <section className="mt-4">
      <Title>AvatarTest</Title>
      <Div className="px-12 py-4 m-8 bg-blue-300">{avatars}</Div>
    </section>
  );
}
```

> display 스타일 속성
> 

| hidden | none |
| --- | --- |
| block | block |
| inline-block | inline-block |
| inline | inline |
| flex | flex |

> visibility 스타일 속성
> 

웹 페이지를 인터렉티브하게 구현하다 보면 요소를 숨겨야하는데 이때 사용한다.

| visible | visibility : visible |
| --- | --- |
| invisible | visibility : hidden |
|  |  |

> position
> 

absolute를 설정한 요소의 위치는 좌표가 되는 기준이 있어야 한다. 부모중 relative를 설정한 컨테이너 기준

| absolute | absolute |
| --- | --- |
| relative | relative |
|  |  |

> z-index 스타일 속성
> 

가상의 z 축을 사용한 HTML 요소의 3차원 개념화

z-index가 0이면 모니터 표면에 근접한 것

| z-0 | z-index:0; |
| --- | --- |
| z-10 | z-index:10; |
| z-20 | z-index:20; |
| z-30 | z-index:30; |
| z-40 | z-index:40; |
| z-50 | z-index:50; |
| z-auto | z-index:auto; |

> Overlay 컴포넌트 만들기
> 

사용자에게 대화 상자를 보여주고 대화 상자 영역 밖의 버튼을 클릭할 수 없게 해야 할 때가 있다. 이런 기능을 하는 상자를 모달 대화 상자라고 한다.

상자가 나타나고 임의로 클릭할 수 없게 하는 화면 UI를 오버레이 라고한다.

1. 웹페이지 화면을 꽉 채우는 Div를 만드는 것으로 시작한다.
2. 이 Div의 position을 absolute로 설정하고 z-index를 다른 HTML 요소보다 높게 설정한다. 그러면 이 Div가 웹 페이지 가장 최상단에 위치 하므로 마우스클릭을 모두 흡수한다.
