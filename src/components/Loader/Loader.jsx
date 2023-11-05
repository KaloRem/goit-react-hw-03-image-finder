import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className= {styles.loader_container}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;