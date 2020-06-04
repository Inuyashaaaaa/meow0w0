import React from 'react'
import { storiesOf } from '@storybook/react'

import AutoComplete, { DataSourceType } from './autoComplete'

interface ObjectType {
  id?: number,
  value: string,
  url?: string,
  login?: string
}

const data = [{value: '123'}, {value: '234' }, {value: '345'}]

const handleFetchSuggestions = (query: string) => {
  return data
} 

const defaultAutoComplete = () => (
  <AutoComplete 
    fetchSuggestions={handleFetchSuggestions}
  />
)

storiesOf('AutoComplete', module)
  .add('AutoComplete', defaultAutoComplete)