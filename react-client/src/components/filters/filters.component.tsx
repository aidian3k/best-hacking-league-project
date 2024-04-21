import { Button, DatePickerProps, Typography } from "antd";
import { DatePicker } from "antd";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setEndingDate, setIsSearchingActiveEmployees, setProjectManagementPlatforms, setStartingDate } from "../../redux/filters/Filters.slice";
import { Checkbox, CheckboxProps, Select, Badge } from "antd";
import { ProjectManagementPlatform } from "../../redux/filters/Filters.types";
import { blue } from '@ant-design/colors';
import dayjs from "dayjs";

const Filters = () => {
    const filters = useSelector((state: RootState) => state.filters)
    const dispatch = useDispatch();

    const setSearchActiveEmployees: CheckboxProps['onChange'] = (e) => {
        dispatch(setIsSearchingActiveEmployees(e.target.checked))
      };

    const calculateActiveFilters = () => {
        let activeFiltersCount = 0;
        if (filters.endingDate) {
            activeFiltersCount++;
        }
        if (filters.startingDate) {
            activeFiltersCount++;
        }
        if (filters.isSearchingActiveEmployees) {
            activeFiltersCount++;
        }
        if (filters.projectIds.length != 0) {
            activeFiltersCount++;
        }
        if (filters.projectManagementPlatforms.length != 0) {
            activeFiltersCount++;
        }

        return activeFiltersCount;
    }

    const onStartingDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (!date) {
            return;
        }
        dispatch(setStartingDate(date.toDate().toLocaleDateString()))
    };

    const onEndingDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (!date) {
            return
        }
        dispatch(setEndingDate(date.toDate().toLocaleDateString()))
    };
    
    const convertDate = (date: string) => {
        if (date) {
            return dayjs(date);
        } else {
            return null
        }
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className={'inline-flex gap-4'}>
                <Typography.Title level={4}>Filters</Typography.Title>
                <Badge count={calculateActiveFilters()} />
            </div>
            <div className={'w-full'}>
                <Typography.Text className="mr-2">Starting Date:</Typography.Text>
                <DatePicker value={convertDate(filters.startingDate)} onChange={onStartingDateChange} style={{ width: '100%' }} />
            </div>
            <div>
                <Typography.Text className="mr-2">Ending Date:</Typography.Text>
                <DatePicker value={convertDate(filters.endingDate)} onChange={onEndingDateChange} style={{ width: '100%' }} />
            </div>
            <div>
                <Checkbox onChange={setSearchActiveEmployees}>Search active employees only</Checkbox>
            </div>
            <div>
                <Typography.Text className="mr-2">Project management platform:</Typography.Text>
                <Select
                    defaultValue={filters.projectManagementPlatforms}
                    style={{ width: '100%' }}
                    onChange={(platforms: ProjectManagementPlatform[]) => dispatch(setProjectManagementPlatforms(platforms))}
                    mode="multiple"
                    options={[
                        { value: ProjectManagementPlatform.JIRA, label: 'Jira' },
                        { value: ProjectManagementPlatform.AZURE, label: 'Azure DevOps' },
                        { value: ProjectManagementPlatform.TRELLO, label: 'Trello' },
                    ]}
                />
            </div>
            <div>
                <Button color={blue.primary} style={{ width: '100%' }} onClick={() => dispatch(clearFilters())}>Clear filters</Button>
            </div>
        </div>
    )
}

export default Filters;