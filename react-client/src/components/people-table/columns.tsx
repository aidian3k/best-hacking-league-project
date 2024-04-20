import React from 'react';
import {Button, Space, TableProps, Tag} from 'antd';
import {MailOutlined, PhoneOutlined, TeamOutlined} from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  picture: string;
  title: string;
  languages: string[];
  team: string;
  story_points: number;
  actions: string[];
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const colors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (_, record) => (
        <div className={'flex flex-row gap-5'}>
          <div>
            <img className={'w-10 h-10 rounded-full'} src={record.picture} alt={'avatar'} />
          </div>
          <div className={'flex flex-col'}>
            <a>{record.name}</a>
            <span className={'text-gray-400 text-xs'}>{record.title}</span>
          </div>
        </div>
    ),
  },
  {
    title: 'Languages',
    dataIndex: 'languages',
    key: 'languages',
    align: 'center',
    render: (_, {languages}) => (
        <>
          {languages.map((language) => {
            let color = colors.at(getRandomInt(colors.length));
            return (
                <Tag color={color} key={language}>
                  {language.toUpperCase()}
                </Tag>
            )
          })}
        </>
    )
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    align: 'center',
  },
  {
    title: 'Story Points',
    dataIndex: 'story_points',
    key: 'story_points',
    align: 'center',
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    align: 'center',
    render: (_, record) => (
        <Space size="middle">
          <Button icon={<MailOutlined/>}>Email</Button>
          <Button icon={<PhoneOutlined/>}>Call</Button>
          <Button icon={<TeamOutlined/>} type={'primary'}>View Profile</Button>
        </Space>
    ),
  },
];

export type {DataType};
export default columns;