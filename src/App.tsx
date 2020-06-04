import React, { useState } from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import Button from './components/Button/button'
import Input from './components/Input/input'

const App: React.FC = () => {
  const [ show, setShow ] = useState(false)
  const [value, setValue] = useState('')
  return (
    <div className="App">
      <Icon theme="primary" icon="arrow-down" size="10x"></Icon>
      <header className="App-header">
        <Menu defaultIndex={'0'} mode="horizontal">
          <MenuItem>
            meow-menu-item-1
          </MenuItem>
          <MenuItem disabled>
            meow-menu-item-2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              meow-submenu-item-1
            </MenuItem>
            <MenuItem>
              meow-submenu-item-2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            meow-menu-item-3
          </MenuItem>
        </Menu>
        <Button size="lg" onClick={() => { setShow(!show) }}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-top"
          wrapper
        >
          <Button size='lg' btnType='primary'>哈哈</Button>
        </Transition>
        <Input type="text" value={value} icon="calendar" onChange={e => setValue(e.target.value)}></Input>
      </header>
    </div>
  );
}

export default App;
