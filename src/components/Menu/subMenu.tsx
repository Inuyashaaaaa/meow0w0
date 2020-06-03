import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Transition from '../Transition/transition'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [ menuOpen, setMenuOpen ] = useState(isOpened)
  const classes = classNames('meow-menu-item meow-submenu-item', className, {
    'is-active': context.index === index
  })
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle:boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300);
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false)
    }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('meow-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent =  React.Children.map(children, (child, childIndex) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${childIndex}`
        })
      } else {
        console.error('Wraning: subMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout={200}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="meow-submenu-title" {...clickEvents}>
        {title}
        <Icon 
          icon="angle-down"
          className="arrow-icon"
          style={{transform: menuOpen ? 'rotate(0.5turn)' : 'rotate(0)'}}
        >       
        </Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
