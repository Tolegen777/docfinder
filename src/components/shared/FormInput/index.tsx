import React from 'react';
import {Input, InputProps} from 'antd';
import styles from './styles.module.scss'

type Props = {
} & InputProps

const FormInput = (props : Props) => {

    return (
        <Input
            {...props}
            size={'large'}
            className={styles.input}
        />
    );
};

export default FormInput;
