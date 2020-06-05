import React from 'react'
import { storiesOf } from '@storybook/react'
import Upload from './upload'
import { action } from '@storybook/addon-actions'

const DefaultUpload = () => (
  <Upload
    action='http://jsonplaceholder.typicode.com/posts'
    onProgress={action('progress')}
    onSuccess={action('success')}
    onError={action('error')}
  >
  </Upload>
)

storiesOf('Upload', module)
  .add('Default Upload', DefaultUpload)