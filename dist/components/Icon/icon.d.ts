import React from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
declare type IconTheme = 'primary' | 'danger' | 'dark' | 'secondary' | 'success' | 'info' | 'warning' | 'light';
interface IconProps extends FontAwesomeIconProps {
    theme?: IconTheme;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
