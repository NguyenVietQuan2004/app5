import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FacebookIcon, GoogleIcon } from '~/assets/icons/icons';
import firebase, { auth, db } from '~/firebase/config';
import { addDocument } from '~/firebase/services';

const cx = classNames.bind(styles);
const fbProvider = new firebase.auth.FacebookAuthProvider();

function Login() {
    const handleSignInWithFacebook = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        if (additionalUserInfo?.isNewUser) {
            const { displayName, photoURL, email, uid } = user;
            addDocument('users', {
                displayName,
                email,
                photoURL,
                uid,
                providerId: additionalUserInfo.providerId,
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span> Fun chat</span>
                <span>Đăng nhập</span>
                <button onClick={handleSignInWithFacebook}>
                    <FacebookIcon /> Đăng nhập bằng facebook
                </button>
                <button>
                    <GoogleIcon />
                    Đăng nhập bằng gu gồ
                </button>
            </div>
        </div>
    );
}

export default Login;
