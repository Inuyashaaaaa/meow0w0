import React from 'react'
import { storiesOf } from '@storybook/react'
import Upload from './upload'
import { action } from '@storybook/addon-actions'
import Icon from '../Icon/icon'

const DefaultUpload = () => (
  <Upload
    action='http://jsonplaceholder.typicode.com/posts'
    onProgress={action('progress')}
    onSuccess={action('success')}
    onError={action('error')}
    accept=".jpg"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>Drag file over to upload</p>
  </Upload>
)

storiesOf('Upload', module)
  .add('Default Upload', DefaultUpload)