import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { AddIcon, CollapseIcon, SignOutIcon } from '~/assets/icons/icons';
import { useContext, useState } from 'react';
import { auth } from '~/firebase/config';
import { AuthContext } from '~/Context/AuthProvider';
import { AppContext } from '~/Context/AppProvider';

const cx = classNames.bind(styles);
function Sidebar() {
    const { currentUser } = useContext(AuthContext);
    const { setShowModalAddRoom, rooms, setCurrentRoom } = useContext(AppContext);
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    const handleSignOutWithFacebook = () => {
        auth.signOut();
    };
    const handelshowModalAddRoom = () => {
        setShowModalAddRoom(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('userInfo')}>
                    <span className={cx('userInfo__img')}>
                        <img alt="" src={currentUser.photoURL} />
                    </span>
                    <span>{currentUser.displayName}</span>
                </div>
                <button onClick={handleSignOutWithFacebook}>
                    <SignOutIcon /> Đăng xuất
                </button>
            </div>
            <div className={cx('container')}>
                <button onClick={toggleCollapse}>
                    <CollapseIcon /> Danh sách các phòng
                </button>
                {!collapsed && (
                    <>
                        <div className={cx('room')}>
                            {rooms.map((room) => {
                                return (
                                    <button key={room.id} onClick={() => setCurrentRoom(room)}>
                                        {room.name}
                                    </button>
                                );
                            })}
                        </div>
                        <button className={cx('addRoom')} onClick={handelshowModalAddRoom}>
                            <AddIcon /> Thêm phòng
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
