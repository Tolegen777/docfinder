// DropdownMenu.tsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import {MedicalProceduresList} from "@/types/procedureTypes";

export interface DropdownProps {
    id: number;
    title: string;
    procs: MedicalProceduresList[];
}

const DropdownMenu: React.FC<DropdownProps> = ({ id, title, procs }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button onClick={handleToggle} className={styles.dropdownButton}>
                {title}
            </button>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    {procs.map(proc => (
                        <div key={proc.medical_procedure_id} className={styles.dropdownItem}>
                            {proc.medical_procedure_title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
