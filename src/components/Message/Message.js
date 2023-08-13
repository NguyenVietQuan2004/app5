import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { formatRelative } from 'date-fns';
import { useEffect, useRef } from 'react';
const cx = classNames.bind(styles);

function formatDate(seconds) {
    let formattedDate = '';

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
}
function Message({ text, photoURL, displayName, createdAt }) {
    const messageRef = useRef();
    useEffect(() => {
        if (messageRef?.current) {
            messageRef.current.scrollIntoView({
                behavior: 'smooth', // Optional, sử dụng 'smooth' để tạo hiệu ứng cuộn mượt
                block: 'start', // Cuộn đến phần đầu của phần tử
            });
        }
    });
    return (
        <div className={cx('message')} ref={messageRef}>
            <div className={cx('messageHeader')}>
                <span className={cx('avatar')}>
                    <img alt="" src={photoURL} />
                </span>
                <span className={cx('name')}>{displayName}</span>
                <span className={cx('time')}>{formatDate(createdAt?.seconds)}</span>
            </div>
            <div className={cx('text')}>{text}</div>
        </div>
    );
}

export default Message;
