import {ProjectItem} from "./project-entry.types";
import {FileTextOutlined, DownOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, Button, Image, MenuProps} from 'antd';
import {Menu} from 'antd';
import {useState} from "react";

export const ProjectEntry = ({project}: { project: ProjectItem }) => {
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
      type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem(
        <div className={'flex flex-row'}>
          <div className={'flex flex-row items-center gap-1 mr-2'}>
            <p className={'text-sm'}>{project.title}</p>
            <p className={'text-gray-400 text-xs'}>~ Managed by <span
                className={'font-medium'}>{project.managerName}</span></p>
          </div>
          <p className={'text-sm mr-auto'}>[{project.entriesCount} tasks]</p></div>,
        '4', <Avatar shape="square" size={'small'} src={project.icon}/>, [
          getItem('Task 9', '9', <FileTextOutlined/>),
          getItem('Task 10', '10', <FileTextOutlined/>),
          getItem('Task 11', '11', <FileTextOutlined/>),
          getItem('Task 12', '12', <FileTextOutlined/>),
        ]),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
      <>
        <Menu
            onClick={onClick}

            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />

        {/*<div className={'flex flex-row items-center hover:bg-gray-100 py-2 px-2'}>*/}
        {/*  <img className={'w-7 h-7 rounded-full mr-4'} src={project.icon} alt={"projectPhoto"}/>*/}
        {/*  <div className={'flex flex-row items-center gap-1 mr-2'}>*/}
        {/*    <p className={'text-sm'}>{project.title}</p>*/}
        {/*    <p className={'text-gray-400 text-xs'}>~ Managed by <span*/}
        {/*        className={'font-medium'}>{project.managerName}</span></p>*/}
        {/*  </div>*/}
        {/*  <p className={'text-sm mr-auto'}>[{project.entriesCount} tasks]</p>*/}
        {/*  <Button*/}
        {/*      type="text"*/}
        {/*      size={'small'}*/}
        {/*      icon={<DownOutlined/>}*/}
        {/*      loading={loading}*/}
        {/*      onClick={() => enterLoading()}*/}
        {/*  />*/}
        {/*</div>*/}
      </>
  )
}

export default ProjectEntry;