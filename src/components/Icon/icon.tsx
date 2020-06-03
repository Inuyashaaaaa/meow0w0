import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas)

type IconTheme = 'primary' | 'danger' | 
                 'dark' | 'secondary' |
                 'success' | 'info' |
                 'warning' | 'light'

interface IconProps extends FontAwesomeIconProps {
  theme?: IconTheme
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props
  const classes = classNames('meow-icon', className, {
    [`meow-icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon
