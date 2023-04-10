## 03-5 daisyui CSS 컴포넌트 이해하기

> CSS 컴포넌트란?
> 

원하는 HTML 요소의 스타일링을 쉽게하는 CSS 클래스를 제공하는데, 이를 CSS 프레임워크는 이를 CSS 컴포넌트라고 부른다. 

> 색상 테마
> 

웹 페이지에서 가장 많이 사용되는 색상을 주 색상 이라고한다. 두 번째로 많이 사용되는 색상을 보조 색상이라고 한다. 

daisyui 플러그인의 색상테모로 강조,정보,경고나,오류 색상 등을 제공한다. 이런 색상들을 한꺼번에 부를 때 색상 테마라고 한다.

> Button 컴포넌트 구현하기
> 

Button 이란 리액트 컴포넌트가 있다면 좀 더 쉽게 사용 가능하며 아무런 설정도 하지 않으면 기본값이 적용되도록 한다면 좀 더 간결하게 사용가능하다.

> btn 부분 생략하기
> 

```tsx
import type {FC, DetailedHTMLProps, ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  >

export type ButtonProps = ReactButtonProps & {}
  
export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className: _className,
  ...buttonProps
}) => {
  const className = ['btn', _className].join(' ')
  return <button {...buttonProps} className={className} />
}
```

> 버튼의 크기 설정
> 

BTN-LG , BTN-MD ,BTN-SM ,BTN -XS 4가지 클래스를 제공 

> Icon 컴포넌트 구현하기
> 

앞서 제작한 Button 과 src/components 디렉터리에 구현해 둔 Icon 컴포넌트를 앞선 코드 형태로 동작하도록 구현한 것이다. Button의 크기에 따라 아이콘의 텍스트 크기를 강제로 설정하는 부분을 구현했다.

```tsx
import type { FC } from "react";
import type { ButtonProps } from "./Button";
import type { IconProps as CIonProps } from "../../components";
import { Button } from "./Button";
import { Icon as CIcon } from "../../components";

export type IconProps = ButtonProps &
  CIonProps & {
    iconClassName?: string;
  };

export const Icon: FC<IconProps> = ({
  name,
  iconClassName,
  className,
  ...buttonProps
}) => {
  const btnClassName = ["btn-circle", className].join(" ");
  return (
    <Button {...buttonProps} className={btnClassName}>
      <CIcon className={iconClassName} name={name} />
    </Button>
  );
};
```

> Input 컴포넌트 구현하기
> 

input은 button과 함께 가장 널리 사용되는 HTML 요소이다.

daisyui의 input CSS 컴포넌트는 사용자 입력을 받는 input 태그일때 경계를 2줄로 표시해 입력 포커스를 보여줌

색상 크기 테두리 설정은 방법 다 똑같음 .

> 모달 컴포넌트 구현하기
> 

사용자의 선택을 입력받는 대화상자는 크게 모덜리스와 모달 2가지 종류가 있다. 

모덜리스 대화 상자는 영역 바깥쪽을 클릭할 수 있지만, 모달 ㅐ화 상자는 영역 바깥 쪽의 UI가 동작하지 않는다. 

daisyui는 모달대화상자 CSS 컴포넌트를 제공한다. 크게 modal,modal-box,modal-action 등 3가지 클래스로 구성

1. 최상위 컴포넌트에 modal 클래스를 부여 
2. 모달 대화 상자를 오픈하려면 modal-open 클래스를 부여
3. daisyui의 모달 컴포넌트는 최상위 컴포넌트의 첫 번째 자식 컴포넌트로 modal-box를 부여해야 한다. 
4. onCloseIconClicked 속성은 닫기 아이콘
