import styles from "styles/hello.module.scss";

// uses scss modules, unlike most of the other components that use styled components, styled system, etc.
// note the .module.scss suffix on the file. note the styles[] syntax.
const Hello = ({}) => {
  return (
    <div className={styles['hello']}>Hello</div>
  )
}

export default Hello;