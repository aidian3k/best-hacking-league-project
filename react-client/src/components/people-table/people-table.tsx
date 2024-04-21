import {Button, Table} from "antd";
import data from './data';
import columns, {DataType} from './columns';
import {useState} from "react";
import FoundedUserTasksModal from "../founded-user-tasks-modal/founded-user-tasks-modal";

const PeopleTable = () => {
    const [selectedFoundedUser, setSelectedFoundedUser] = useState<DataType | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleViewFoundedUserTasks = (record: DataType) => {
        setSelectedFoundedUser(record);
        setModalVisible(true);
    };

    const datadata: DataType = {
            key: '1',
            name: 'John Brown',
            picture: 'https://www.npg.org.uk/assets/image-cache//npg-image-crops/main.20e73652.blog_anthony_comber_badu.21751e69.jpg',
            title: 'Junior Developer',
            languages: ['PL','ENG'],
            team: 'Hoolers',
            story_points: 9,
            actions: []
    };

    return (
        <>
            <Table style={{width: '100%'}} dataSource={data} columns={columns} />
            <Button onClick={() => handleViewFoundedUserTasks(datadata)}>View</Button>
            {selectedFoundedUser && (
                <FoundedUserTasksModal visible={modalVisible} profileData={selectedFoundedUser} onClose={() => setModalVisible(false)} />
            )}
        </>
    )
}

export default PeopleTable;