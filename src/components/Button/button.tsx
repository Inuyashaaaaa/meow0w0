import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 这是我们的第一个 Button 组件
 * ## Button header
 * ~~~js
 * import { Button } from 'meow'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
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

export default Button;