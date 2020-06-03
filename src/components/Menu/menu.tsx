import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
  const { 
    className,
    mode,
    style,
    children,
    onSelect,
    defaultIndex,
    defaultOpenSubMenus
  } = props
  const [ active, setActive ] = useState(defaultIndex) 
  const classes = classNames('meow-menu', className, {
    'meow-menu-vertical': mode === 'vertical',
    'meow-menu-horizontal': mode === 'horizontal'
  })
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: active ? active : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Wraning: Menu has a child which is not a MenuItem component')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="meow-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0',
  defaultOpenSubMenus: []
}

export default Menu