import React from 'react';
import {InputNumber, InputNumberProps} from 'antd';
import styles from './styles.module.scss'

type Props = {
} & InputNumberProps

const FormInputNumber = (props : Props) => {

    return (
        <InputNumber
            {...props}
            size={"large"}
            className={styles.input}
        />
    );
};

export default FormInputNumber;
