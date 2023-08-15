import classNames from 'classnames/bind';
import styles from './ModalinviteUser.module.scss';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { useDebounced } from '~/hooks/useDebounced';
import useFirestore from '~/hooks/useFireStore';
import { CloseIcon } from '~/assets/icons/icons';
import { db } from '~/firebase/config';

const cx = classNames.bind(styles);
function ModalinviteUser() {
    const { setShowModalInviteUser, currentRoom } = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const [inputValue, setInputValue] = useState('');
    const [listUserSelected, setListUserSelected] = useState([]);

    const debounced = useDebounced(inputValue, 300);
    const condition = useMemo(() => {
        return {
            fieldName: 'keywords',
            operator: 'array-contains',
            compareValue: debounced,
        };
    }, [debounced]);
    const data = useFirestore('users', condition);
    const searchUser = data.filter((userSearch) => {
        return userSearch.uid != currentUser.uid;
    });
    const handleDeleteSelected = (uidDelete) => {
        setListUserSelected((pre) => {
            return pre.filter((userSelected) => {
                return userSelected.uid != uidDelete;
            });
        });
    };
    const handleSelected = (user) => {
        if (listUserSelected.includes(user)) {
        } else {
            setListUserSelected((pre) => [...pre, user]);
        }
    };
    const handelOk = (e) => {
        e.preventDefault();
        const roomRef = db.collection('rooms').doc(currentRoom.id);

        roomRef.update({
            members: [...currentRoom.members, ...listUserSelected.map((val) => val.uid)],
        });
        setShowModalInviteUser(false);
    };
    const handelCancel = () => {
        setShowModalInviteUser(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>Mời thêm thành viên</div>
                <form>
                    {listUserSelected.map((userSelected) => {
                        return (
                            <div className={cx('itemUserSelected')} key={userSelected.uid}>
                                <img alt="" src={userSelected.photoURL} />
                                <span>{userSelected.displayName}</span>
                                <CloseIcon
                                    onClick={() => {
                                        handleDeleteSelected(userSelected.uid);
                                    }}
                                />
                            </div>
                        );
                    })}
                    <input
                        placeholder="Nhập tên thành viên"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className={cx('listUser')}>
                        {searchUser.map((user) => {
                            return (
                                <div className={cx('itemUser')} onClick={() => handleSelected(user)} key={user.uid}>
                                    <img alt="" src={user.photoURL} />
                                    <span>{user.displayName}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('footer')}>
                        <button type="button" onClick={handelCancel}>
                            Cancel{' '}
                        </button>
                        <button type="submit" onClick={handelOk}>
                            Ok
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalinviteUser;
