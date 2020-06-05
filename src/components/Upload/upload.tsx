import React, { FC, ChangeEvent, MouseEvent, useRef } from 'react'
import axios from 'axios'
import Button from '../Button/button'

export interface UploadProps {
  action: string,
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onProgress?: (percentage: number, file: File) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onSuccess,
    onError,
    onProgress
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange')
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)

  }
  const uploadFiles = (files: FileList) => {
    const fileArr = Array.from(files)
    fileArr.forEach(file => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios.post(action, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        },
        onUploadProgress(progress) {
          const precent = Math.round(progress.loaded / progress.total * 100);
          if (onProgress) {
            onProgress(precent, file)
          }
        }
      })
      .then(res => {
        console.log(res.data)
        if (onSuccess)
        onSuccess(res.data, file)
      })
      .catch(err => {
        console.error(err)
        if (onError)
        onError(err, file)
      })
    })
  }
  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  return (
    <div>
      <Button 
        btnType="primary"
        onClick={handleClick}
      >
        Upload File
      </Button>
      <input
        ref={inputRef}
        type="file"
        style={{display: 'none'}}
        className="meow-file-input"
        onChange={handleChange}
      />
    </div>
  )
}

export default Upload;