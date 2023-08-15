import { createContext, useContext, useMemo, useState } from 'react';
import useFirestore from '~/hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();
function AppProvider({ children }) {
    const [showModalAddRoom, setShowModalAddRoom] = useState(false);
    const [showModalInviteUser, setShowModalInviteUser] = useState(false);

    const [currentRoomId, setCurrentRoomId] = useState({});
    const {
        currentUser: { uid },
    } = useContext(AuthContext);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);
    const rooms = useFirestore('rooms', roomsCondition);
    const currentRoom = useMemo(() => rooms.find((room) => room.id === currentRoomId) || {}, [rooms, currentRoomId]);

    // users condition

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: currentRoom.members,
        };
    }, [currentRoom.members]);
    const members = useFirestore('users', usersCondition);
    // message condition

    const condition = useMemo(
        () => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: currentRoom.id,
        }),
        [currentRoom.id],
    );

    const messages = useFirestore('messages', condition);
    return (
        <AppContext.Provider
            value={{
                showModalAddRoom,
                setShowModalAddRoom,
                rooms,
                currentRoomId,
                setCurrentRoomId,
                currentRoom,
                members,
                messages,
                showModalInviteUser,
                setShowModalInviteUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
