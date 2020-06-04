import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Input from './input'

const defaultInput = () => (
  <Input type="text" value="" placeholder="write something..."></Input>
)

const disabledInput = () => (
  <Input type="text" value="disabled input" disabled></Input>
)

const appendInput = () => (
  <>
    <Input type="text" value="1486835097" prepend="https://"></Input>
    <hr></hr>
    <Input type="text" value="1486835097" append="@qq.com"></Input>
  </>
)

const IconInput = () => {
  const [inputValue, setValue] = useState('')
  return <Input type="text" value={inputValue} icon="calendar" onChange={e => setValue(e.target.value)}></Input>
}

storiesOf('Input', module)
  .add('Input', defaultInput)
  .add('Disabled Input', disabledInput)
  .add("Append Input", appendInput)
  .add("Icon Input", IconInput)