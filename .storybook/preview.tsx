import '../src/assets/index.scss';
import './fix_info_style.scss'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import React from 'react'

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}
const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
  info: {
    header: false,
    inline: true
  }
})