import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { AddUserIcon } from '~/assets/icons/icons';
import { useContext, useState } from 'react';
import { AppContext } from '~/Context/AppProvider';
import Message from '~/components/Message';
import { addDocument } from '~/firebase/services';
import { AuthContext } from '~/Context/AuthProvider';

const cx = classNames.bind(styles);
function Content() {
    const { currentRoom, members, messages } = useContext(AppContext);
    const {
        currentUser: { uid, photoURL, displayName },
    } = useContext(AuthContext);
    console.log(messages);
    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            addDocument('messages', {
                text: inputMessage,
                uid,
                photoURL,
                roomId: currentRoom.id,
                displayName,
            });
            setInputMessage('');
        }
    };
    return (
        <div className={cx('wrapper')}>
            {Object.keys(currentRoom).length ? (
                <>
                    <div className={cx('header')}>
                        <div className={cx('roomInfo')}>
                            <span>{currentRoom.name}</span>
                            <p>{currentRoom.discription}</p>
                        </div>
                        <div className={cx('users')}>
                            <AddUserIcon />
                            <p>Mời</p>
                            {members.map((member) => {
                                return (
                                    <span key={member.uid}>
                                        <img alt="" src={member.photoURL} />
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('messageList')}>
                            {messages.map((mes) => {
                                return (
                                    <Message
                                        key={mes.id}
                                        text={mes.text}
                                        photoURL={mes.photoURL}
                                        displayName={mes.displayName}
                                        createdAt={mes.createdAt}
                                    />
                                );
                            })}
                        </div>
                        <form className={cx('sendMessage')}>
                            <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                            <button onClick={handleSubmit}>Gửi</button>
                        </form>
                    </div>
                </>
            ) : (
                <div className={cx('noRoom')}>Hãy chọn phòng!</div>
            )}
        </div>
    );
}

export default Content;
