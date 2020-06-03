import React from 'react';
import logo from './logo.svg';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faCoffee} size="10x"/>
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
        <Button disabled >Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">Hello</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
