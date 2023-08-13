import classNames from 'classnames/bind';
import styles from './ModalAddRoom.module.scss';
import { useContext, useState } from 'react';
import { AppContext } from '~/Context/AppProvider';
import { addDocument } from '~/firebase/services';
import { AuthContext } from '~/Context/AuthProvider';

const cx = classNames.bind(styles);
function Content() {
    const { setShowModalAddRoom } = useContext(AppContext);
    const {
        currentUser: { uid },
    } = useContext(AuthContext);
    const [inputName, setInputName] = useState('');
    const [inputdiscription, setInputdiscription] = useState('');

    const handelCancel = () => {
        setShowModalAddRoom(false);
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        addDocument('rooms', {
            name: inputName,
            discription: inputdiscription,
            members: [uid],
        });
        setShowModalAddRoom(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>Tạo phòng</div>
                <form>
                    <label htmlFor="name">Tên phòng</label>
                    <input
                        id="name"
                        placeholder="Nhập tên phòng"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                    <label htmlFor="discription">Mô tả</label>
                    <input
                        id="discription"
                        placeholder="Nhập mô tả"
                        value={inputdiscription}
                        onChange={(e) => setInputdiscription(e.target.value)}
                    />

                    <div className={cx('footer')}>
                        <button type="button" onClick={handelCancel}>
                            Cancel
                        </button>
                        <button type="submit" onClick={(e) => handelSubmit(e)}>
                            Ok
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Content;
