import React from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  children?: React.ReactNode,
  href ?: string,
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const { 
    btnType,
    disabled,
    size,
    children,
    className,
    href,
    ...restProps
  } = props
  const classes = classNames('btn', className,  {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })
  if (btnType === 'link' && href) {
    return (
      <a
        {...restProps}
        className={classes}
        href={href}
      >
        {children}
      </a>
    )
  } else  {
    return (
      <button
        {...restProps}
        className={classes}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button