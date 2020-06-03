import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
  mode: 'horizontal'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn()
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={'0'}>
        active
      </MenuItem>
      <MenuItem disabled index={'1'}>
        disabled
      </MenuItem>
      <MenuItem index={'2'}>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
 

let wrapper: RenderResult, 
menuElement: HTMLElement,
activeElement: HTMLElement,
disabledElement: HTMLElement

const createStyleFile = () => {
  const cssFile: string = `
    .meow-submenu {
      display: none;
    }
    .meow-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.appendChild(createStyleFile())
    menuElement = wrapper.getByTestId('meow-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('meow-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toBe(4)
    expect(activeElement).toHaveClass('meow-menu-item is-active')
    expect(disabledElement).toHaveClass('meow-menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('meow-menu-item is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('meow-menu')
    expect(menuElement).toHaveClass('meow-menu-vertical')
  })
  it('should show dropdown items when hover on subMenu, horizontal', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
  it('should show dropdown items when click on subMenu, vertical', async () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    wrapper.container.appendChild(createStyleFile())
    const dropElement = wrapper.queryByText('drop1')
    const dropdownElement = wrapper.getByText('dropdown')
    expect(dropElement).not.toBeVisible()
    fireEvent.click(dropdownElement)
    await wait(() => {
      expect(dropElement).toBeVisible()
    })
  })
})