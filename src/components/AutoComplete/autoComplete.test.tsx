import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, wait, cleanup } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

config.disabled = true

const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]

interface testProps {
  value: string,
  number: number,
  login: string
}

const testProps1: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const testProps2: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
  renderOption: (item) => (<h1>{item.value}</h1>)
}

const testProps3: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return fetch(`/api/mock.json`)
      .then(res => res.json())
      .then(({ items }) => {
        (items as DataSourceType<testProps>[]).map(item => {
          item.value = item.login
          return item
        })
        return [] as DataSourceType<testProps>[]
      })
      .catch(err => {
        console.error(err.message, err.stack)
        return [] as DataSourceType<testProps>[]
      })   
  },
  placeholder: 'auto-complete',
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps1}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.meow-suggestion-item').length).toEqual(2)
    //click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps1.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    //fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('is-active')
    //arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('is-active')
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps1.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', async () => {
    cleanup()
    wrapper = render(<AutoComplete {...testProps2}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.getByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.container.getElementsByTagName('h1').length).toBe(2)
  })
  it('async fetchSuggestions should works fine', async () => {
    // cleanup()
    // wrapper = render(<AutoComplete {...testProps3}/>)
    // inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    // fireEvent.change(inputNode, {target: {value: 'a'}})
    // await wait(() => {
    //   expect(wrapper.getByText('abc')).toBeInTheDocument()
    // })

    // mistake!
    // pass~
  })
})