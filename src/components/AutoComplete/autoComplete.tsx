import React, { FC, useState, ChangeEvent, ReactElement, useRef, useEffect, KeyboardEvent } from 'react'
import Input, { InputProps } from '../Input/input'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition/transition'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { 
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [ inputValue, setInputValue ] = useState(value as string)
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [ showDropdown, setShowDropdown] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ highlightIndex, setHighlightIndex ] = useState(-1) 
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debouncedValue && !triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setSuggestions(data) 
          if (data.length > 0) {
            setShowDropdown(true)
          }      
        }).catch(err => {
          console.error(err)
        }).finally(() => {
          setLoading(false)
        })

      } else {
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
        setSuggestions(results)
      }
    } else {
      setShowDropdown(false)
    }
  }, [debouncedValue])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break;
      case 38:
        highlight(highlightIndex - 1)
        break;
      case 40:
        highlight(highlightIndex + 1)
        break;
      case 27:
        setShowDropdown(false)
        break;
      default:
        break;
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = false
  }
  const handleSelect = (suggestion: DataSourceType) => {
    setShowDropdown(false)
    setInputValue(suggestion.value)
    if (onSelect) {
      onSelect(suggestion)
    }
    triggerSearch.current = true
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const renderSuggestions = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExit={() => {setSuggestions([])}}
      >
        <ul className="meow-suggestion-list">
          {
            loading &&
            <div className="meow-suggstions-loading-icon">
              <Icon icon="spinner" spin></Icon>
            </div>
          }
          {suggestions.map((suggestion, index) => {
            const cnames = classNames('meow-suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (<li
              className={cnames}
              key={index}
              onClick={() => {
                handleSelect(suggestion)
              }}
            >
              {renderTemplate(suggestion)}
            </li>)
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className="meow-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {suggestions.length > 0 && renderSuggestions()}
    </div>
  )
}

export default AutoComplete;