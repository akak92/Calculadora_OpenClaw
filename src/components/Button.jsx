import styles from './Button.module.css';

/**
 * Button component — uses CSS Modules for scoped styles.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {function} [props.onClick]
 * @param {boolean} [props.disabled]
 * @param {'primary'} [props.variant]
 */
export default function Button({ children, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
