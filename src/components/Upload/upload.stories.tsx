import React from 'react'
import { storiesOf } from '@storybook/react'
import Upload from './upload'
import { action } from '@storybook/addon-actions'

const handleBeforeUpload = (file: File) => {
  const fileSize = file.size / 1000 
  if (fileSize > 50) {
    alert('file too big')
    return false
  }
  return true
}

const renameFile = (file: File) => {
  const newFile = new File([file], 'new_file', { type: 'file' })
  return Promise.resolve(newFile)
}

const DefaultUpload = () => (
  <Upload
    action='http://jsonplaceholder.typicode.com/posts'
    onProgress={action('progress')}
    onSuccess={action('success')}
    onError={action('error')}
    beforeUpload={renameFile}
  >
  </Upload>
)

storiesOf('Upload', module)
  .add('Default Upload', DefaultUpload)