## 03-4 플렉스박스 레이아웃

> flex-direction 스타일 속성
> 

| flex-row | row |
| --- | --- |
| flex-row-reverse | row-reverse |
| flex-col | column |
| flex-col-reverse | column-reverse |

> overflow 스타일 속성
> 

컨테이너의 크기가 고정되었을 때 컨텐츠의  크기가 컨테이너보다 크면 오버플로가 발생한다. 이럴 때 컨텐츠가 컨테이너의 크기를 넘지 않도록 hidden 값을 설정하거나, 넘어서도 표시되게 설정해줘야한다.

| overflow-auto | overflow:auto |
| --- | --- |
| overflow-hidden | overflow:hidden |
| overflow-visible | overflow:visible |
| overflow-scroll | overflow:scroll |

> flex-wrap
> 

자동으로 줄바꿈하여 글을 배치해준다.

| flex-wrap | flex-wrap: wrap; |
| --- | --- |
| flex-wrap-reverse | flex-wrap: wrap-reverse; |
| flex-nowrap | flex-wrap: nowrap |

그외 flex 명령은 검색해서 찾아보기 

> **User 컴포넌트 만들기**
> 

사용자 데이터를 만드는 코드를 다음처럼 작성

```tsx
import * as C from './chance'
import * as I from './image'

export type IUser = {
  uuid: string
  name: string
  jobTitle: string
  email: string
  avatar: string
}
// prettier-ignore
export const makeUser = (
  uuid: string, name: string, jobTitle: string, email: string, avatar: string
): IUser => ({uuid, name, jobTitle, email, avatar})

export const makeRandomUser = (): IUser =>
  makeUser(
    C.randomUUID(),
    C.randomName(),
    C.randomJobTitle(),
    C.randomEmail(),
    I.randomAvatar()
  )
```

앞서 구현한 IUser 타입의 user 속성을 가질 뿐이다.

아바타 이미지가 왼쪽에 나오고 나머지 텍스트는 오른쪽에 나오는데 플렉스를 적용해 구현 

```tsx
import type {FC} from 'react'
import type {DivProps} from '../components'
import * as D from '../data'
import {Div, Avatar} from '../components'

export type UserProps = DivProps & {
  **user: D.IUser**
}
const User: FC<UserProps> = ({user, ...props}) => {
  const {name, email, jobTitle, avatar} = user
  return (
    <div {...props}/>
  )
}
export default User
```

```tsx
...(생략) ... 
const User: FC<UserProps> = ({user, ...props}) => {
  const {name, email, jobTitle, avatar} = user
  return (
      <div className="flex p-2">
        <Avatar src={avatar} size="2rem" />
        <div className="ml-2">
          <p className="font-bold">{name}</p>
        </div>
      </div>
  )
}
export default User
```

User를 사용하는 컴포넌트에서 디자인적으로 융통성을 가질 수 있게하려면 다음 코드에서 보듯 JSX 부분을 다시 Div 컴포넌트로 감싸는 것이 바람직하다.

```tsx
import type {FC} from 'react'
**import type {DivProps} from '../components'**
import * as D from '../data'
import {Div, Avatar} from '../components'

export type UserProps = **DivProps &** {
  user: D.IUser
}
const User: FC<UserProps> = ({user, ...props}) => {
  const {name, email, jobTitle, avatar} = user
  return (
    **<Div {...props}>**
      <div className="flex p-2">
        <Avatar src={avatar} size="2rem" />
        <div className="ml-2">
          <p className="font-bold">{name}</p>
          <p className="text-gray-500 line-clamp-1">{jobTitle}</p>
          <p className="text-blue-500 underline">{email}</p>
        </div>
      </div>
    </Div>
  )
}
export default User
```

이제 UserContainer.tsx 파일을 열고 다음처럼 작성

<Div>로 감싸 주었으므로 UserContainer 관점에서 필요한 추가 스타일링을 쉽게할 수 있음

각 User 컴포넌트의 넓이가 제각각이면 별로다. 이를 방지하고자 minWidth와 width 속성값을 설정 

```tsx
import {Title} from '../components'
import * as D from '../data'
import User from './User'

export default function UserContainer() {
  const children = D.makeArray(10)
    .map(D.makeRandomUser)
    .map(user => (
      <User
        key={user.uuid}
        user={user}
        **className="m-2 text-xs border-2 border-blue-300 rounded-lg "
        minWidth="15rem"
        width="15rem"**
      />
    ))
  return (
    <section className="mt-4">
      <Title>UserContainer</Title>
      <div className="flex flex-wrap items-center justify-center p-4 mt-4">
        {children}
      </div>
    </section>
  )
}
```

> Card 컴포넌트 만들기
> 

대부분의 CSS 프레임워크는 카드라는 이름의 CSS 컴포넌트를 제공한다. 

1. IUser타입으로 writer라는 속성을 만들고 카드 콘텐츠를 채우는 몇 가지 속성을 정의한다.
2. Card.tsx에 디자인 입히기
    1. image 속성 값을 Div 요소의 src 속성에 설정
3. CardContainer.tsx 파일을 열고 다음처럼 구현

```tsx
//Card.ts
import type {IUser} from './User'
import {makeRandomUser} from './User'
import * as C from './chance'
import * as I from './image'
import * as D from './date'

export type ICard = {
  uuid: string
  writer: IUser
  image: string
  title: string
  paragraphs: string
  dayMonthYearDate: string
  relativeDate: string | null
}

export const makeCard = (
  uuid: string,
  writer: IUser,
  image: string,
  title: string,
  paragraphs: string,
  dayMonthYearDate: string,
  relativeDate: string | null
): ICard => ({uuid, writer, image, title, paragraphs, dayMonthYearDate, relativeDate})

export const makeRandomCard = () => {
  const date = D.makeRandomPastDate()
  return makeCard(
    C.randomUUID(),
    makeRandomUser(),
    I.randomImage(800, 600),
    C.randomTitleText(),
    C.randomParagraphs(5),
    D.makeDayMonthYear(date),
    D.makeRelativeDate(date)
  )
}
```

```tsx
//Card.tsx
import type {FC} from 'react'
import type {DivProps} from '../components'
import {Div, Icon} from '../components'
import * as D from '../data'
import User from './User'

export type CardProps = DivProps & {
  card: D.ICard
}
const Card: FC<CardProps> = ({card, ...props}) => {
  const {writer, image, title, paragraphs, dayMonthYearDate, relativeDate} = card
  const icons = ['home', 'search', 'settings', 'favorite'].map(name => (
    <Icon key={name} name={name} className="mr-2 text-3xl" />
  ))

  return (
    <Div {...props}>
      <div className="flex flex-col">
        <Div src={image} className="h-60" />
        <Div className="p-4" minHeight="16rem" height="16rem" maxHeight="16rem">
          <p className="mt-2 text-3xl text-center text-bold">{title}</p>
          <Div className="flex justify-between">
            <User user={writer} className="mt-2" />
            <Div className="mt-2">
              <p className="text-gray-500">{relativeDate}</p>
              <p className="text-gray-500">{dayMonthYearDate}</p>
            </Div>
          </Div>
          <p className="mt-2 line-clamp-4">{paragraphs}</p>
          <Div className="flex flex-row items-center justify-between p-2 mt-2 text-red-500 ">
            {icons}
          </Div>
        </Div>
      </div>
    </Div>
  )
}
export default Card
```

```tsx
//CardContainer.tsx
import {Title} from '../components'
import * as D from '../data'
import Card from './Card'

export default function CardContainer() {
  const children = D.makeArray(10)
    .map(D.makeRandomCard)
    .map(card => (
      <Card
        key={card.uuid}
        card={card}
        className="m-2 overflow-hidden text-xs border-2 shadow-lg rounded-xl "
        minWidth="30rem"
        width="30rem"
      />
    ))
  return (
    <section className="mt-4">
      <Title>CardContainer</Title>
      <div className="flex flex-wrap items-center justify-center p-4 mt-4">
        {children}
      </div>
    </section>
  )
}
```
