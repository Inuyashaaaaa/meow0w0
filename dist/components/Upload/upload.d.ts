import { FC } from 'react';
declare type UploadFileStatus = 'ready' | 'success' | 'progress' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    filename: string;
    status: UploadFileStatus;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onProgress?: (percentage: number, file: File) => void;
    onChange?: (file: File) => void;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    data?: {
        [key: string]: any;
    };
    name?: string;
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
