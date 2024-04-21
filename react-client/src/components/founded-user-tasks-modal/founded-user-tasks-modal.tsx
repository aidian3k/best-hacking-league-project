import React from 'react';
import { Modal } from 'antd';
import {DataType} from "../people-table/columns";

interface FoundedUserTasksModalProps {
    visible: boolean;
    onClose: () => void;
    profileData: DataType;
}

const FoundedUserTasksModal: React.FC<FoundedUserTasksModalProps> = ({ visible, onClose, profileData }) => {
    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            width={800}
            footer={null} // We'll handle actions within the modal content
        >
            <div className={'flex flex-row gap-5'}>
                <div>
                    <img className={'w-10 h-10 rounded-full'} src={profileData.picture} alt={'avatar'}/>
                </div>
                <div className={'flex flex-col'}>
                    <h1>{profileData.name}</h1>
                    <p className={'text-gray-400 text-xs'}>+48 555 444 333</p>
                    <p className={'text-gray-400 text-xs'}>JohnBrown@challengeme.com</p>
                </div>
            </div>
            <div>
                <h1>Projects</h1>
            </div>
        </Modal>
    );
};

export default FoundedUserTasksModal;
