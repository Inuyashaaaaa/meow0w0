import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  size?: InputSize,
  icon?: IconProp,
  prepend?: string | ReactElement,
  append?: string | ReactElement,
  disabled?: boolean,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const { 
    size,
    icon,
    prepend,
    append,
    disabled,
    className,
    ...restProps
  } = props
  const wrapperClass = classNames('meow-input-wrapper', {
    [`meow-input-size-${size}`]: size,
    'meow-input-group': prepend || append,
    'meow-input-group-append': !!append,
    'meow-input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={wrapperClass}>
      {prepend && <div className="meow-input-group-prepend">{prepend}</div>}
      {icon && <div className="meow-icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input 
        {...restProps}
        className="meow-input"
        disabled={disabled}
      />
      {append && <div className="meow-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;