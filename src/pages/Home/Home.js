import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from './Sidebar/Sidabar';
import Content from './Content/Content';
import ModalAddRoom from '~/components/Modal/ModalAddRoom';
import { useContext } from 'react';
import { AppContext } from '~/Context/AppProvider';
const cx = classNames.bind(styles);

function Home() {
    const { showModalAddRoom } = useContext(AppContext);
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <Content />
            {showModalAddRoom && <ModalAddRoom />}
        </div>
    );
}

export default Home;
