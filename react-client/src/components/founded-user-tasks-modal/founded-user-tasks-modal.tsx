import React, { useEffect, useState } from 'react';
import { Modal, Skeleton } from 'antd';
import { MatchingTasksTableData } from "../people-table/columns";
import ProjectList from "../project-list/project-list";
import { getSimpleEmployeeDetails } from "../../tools/api/employee-details/employee-details.service";
import {
    SingleEmployeeDetailedResponse
} from "../../tools/api/employee-details/employee-details.types";
import { ProjectItem } from "../project-entry/project-entry.types";

interface FoundedUserTasksModalProps {
    visible: boolean;
    onClose: () => void;
    profileData: MatchingTasksTableData;
}

const FoundedUserTasksModal: React.FC<FoundedUserTasksModalProps> = ({
    visible,
    onClose,
    profileData
}) => {
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getSimpleEmployeeDetails({ matchingTasksIds: profileData.matchingTasksIds })
            .then(response => {
                console.log('PObieram dane tasków')
                setProjects(mapToProjects(response));
            })
            .catch(error => alert('niepowiodło się'))
            .finally(() => setLoading(false))
    }, [visible])

    const mapToProjects = (response: SingleEmployeeDetailedResponse[]): ProjectItem[] => {
        return response.map((r, index) => {
            return {
                id: index,
                icon: 'https://cdn-icons-png.flaticon.com/512/4727/4727408.png',
                entriesCount: r.projectDetailedTaskInformation.totalNumberOfTasks,
                title: r.projectDetailedTaskInformation.projectName,
                managerName: 'Mary Monroe',
                tasks: r.singleMatchingTaskDetail.map(td => {
                    return {
                        id: td.taskId,
                        title: td.taskTitle,
                        status: td.taskStatus,
                        link: td.taskUrl,
                        description: td.taskDescription
                    }
                })
            } as ProjectItem
        })
    }

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            width={'80%'}
            footer={null} // We'll handle actions within the modal content
        >
            <div className={'flex flex-row gap-5'}>
                <div>
                    <img className={'w-10 h-10 rounded-full'} src={profileData.picture} alt={'avatar'} />
                </div>
                <div className={'flex flex-col'}>
                    <h1>{profileData.name}</h1>
                    <p className={'text-gray-400 text-xs'}>+48 555 444 333</p>
                    <p className={'text-gray-400 text-xs'}>{profileData.email}</p>
                </div>
            </div>
            <div>
                <h1>Projects</h1>
            </div>
            {
                loading ? (
                    <Skeleton />
                ) :  <ProjectList projects={projects} />
            }
        </Modal>
    );
};

export default FoundedUserTasksModal;
