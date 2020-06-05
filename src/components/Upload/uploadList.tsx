import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'

interface UploadFileListProps {
  fileList: UploadFile[],
  onRemove: (_file: UploadFile) => void
}

export const UploadList:FC<UploadFileListProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props
  return (
    <ul className="meow-upload-list">
      {
        fileList.map(item => (
          <li className="meow-upload-list-item" key={item.uid}>
            <span className={`meow-file-name meow-file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.filename}
            </span>
            <span className="meow-file-status">
              {(item.status === 'progress' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="meow-file-actions">
              <Icon icon="times" onClick={() => { onRemove(item)}}/>
            </span>
            {item.status === 'progress' && 
              <progress style={{width: '100%'}}
                value={item.percent || 0} max="100"
              />
            }
          </li>
        ))
      }
    </ul>
  )
}

export default UploadList;