import styles from './styles.module.scss';
import React, {ReactNode} from 'react';

type Props = {
    children: ReactNode
}
export const SkeletonWrapper = ({children}: Props) => {

    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
