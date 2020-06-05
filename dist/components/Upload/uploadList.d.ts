import { FC } from 'react';
import { UploadFile } from './upload';
interface UploadFileListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: FC<UploadFileListProps>;
export default UploadList;
