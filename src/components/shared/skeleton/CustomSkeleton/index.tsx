import styles from './styles.module.scss';

type Props = {
    width?: number | string;
    height?: number | string;
    borderRadius?: number | string;
};
export const CustomSkeleton = ({
    width = '',
    height = '',
    borderRadius = '',
}: Props) => {
    return (
        <div
            className={styles.skeleton_container}
            style={{ width, height, borderRadius }}
        >
            <div className={styles.skeleton_animation}></div>
        </div>
    );
};
