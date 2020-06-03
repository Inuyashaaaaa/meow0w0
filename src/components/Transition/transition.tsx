import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    animation,
    classNames,
    children,
    ...restProps
  } = props
  return (
    <CSSTransition
      classNames={classNames ? animation : animation}
      {...restProps}
    > 
      <div>{children}</div>
    </CSSTransition>
  )
}

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true
}

export default Transition