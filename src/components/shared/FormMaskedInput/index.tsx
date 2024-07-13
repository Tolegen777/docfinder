import React from 'react';
import {MaskedInput} from "antd-mask-input";
import {MaskedInputProps} from "antd-mask-input/build/main/lib/MaskedInput";
import styles from './styles.module.scss'

type Props = {
    mask: string
} & MaskedInputProps

const FormMaskedInput = (props : Props) => {

    return (
        <MaskedInput
            {...props}
            size={"large"}
            className={styles.input}
        />
    );
};

export default FormMaskedInput;
