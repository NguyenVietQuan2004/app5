import styles from './GlobalStyles.module.scss';
function GlobalStyles({ children }) {
    return <div className="wrapper">{children}</div>;
}

export default GlobalStyles;
