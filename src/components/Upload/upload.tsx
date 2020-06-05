import React, { FC, ChangeEvent, MouseEvent, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import Dragger from './dragger'
import UploadList from './uploadList'

type UploadFileStatus = 'ready' | 'success' | 'progress' | 'error'

export interface UploadFile {
  uid: string
  size: number
  filename: string
  status: UploadFileStatus
  percent: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  action: string,
  defaultFileList?: UploadFile[]
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onProgress?: (percentage: number, file: File) => void
  onChange?: (file: File) => void
  beforeUpload?: (file: File) => boolean | Promise<File>
  onRemove?: (file: UploadFile) => void
  headers?: {[key: string]: any}
  data?: {[key: string]: any}
  name?: string
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onSuccess,
    onError,
    onProgress,
    beforeUpload,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
  const UploadFileStatus = (_file:UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevFileList) => prevFileList.map(file => {
      if (file.uid === _file.uid) {
        return {..._file, ...updateObj}
      } else {
        return file
      }
    }))
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange')
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const uploadFiles = (files: FileList) => {
    const fileArr = Array.from(files)
    fileArr.forEach(file => {
      if (beforeUpload) {
        const results = beforeUpload(file)
        if (results && results instanceof Promise) {
          results.then(file => postFile(file))
        } else if (results === true) {
          postFile(file)
        }
      } else {
        postFile(file)
      }
    })
  }
  const postFile = (file: File) => {
    const _file: UploadFile = {
      uid: `${Date.now()} - ${Math.random()}`,
      size: file.size,
      filename: file.name,
      percent: 0,
      status: 'ready',
      raw: file
    }
    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
      formData.append(name || 'file', file)
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key])
        })
      }
      axios.post(action, formData, {
        headers: {
          ...headers,
          'Content-type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress(progress) {
          const percent = Math.round(progress.loaded / progress.total * 100)
          console.log(percent)
          // if (percent === 100) return
          UploadFileStatus(_file, {
            percent,
            status: 'progress'
          })
          if (onProgress) {
            onProgress(percent, file)
          }
        }
      })
      .then(res => {
        UploadFileStatus(_file, {
          status: 'success',
          response: res
        })
        if (onSuccess)
          onSuccess(res.data, file)
        if (onChange)
          onChange(file)
      })
      .catch(err => {
        UploadFileStatus(_file, {
          status: 'error',
          error: err
        })
        if (onError)
          onError(err, file)
        if (onChange) 
          onChange(file)
      })
  }
  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  return (
    <div 
      className="meow-upload-component"
    >
      <div className="meow-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>
          {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
        <input
          className="meow-file-input"
          style={{display: 'none'}}
          ref={inputRef}
          onChange={handleChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;