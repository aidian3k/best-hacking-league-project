import { Typography } from "antd";
import { DatePicker } from "antd";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { setEndingDate, setStartingDate } from "../../redux/filters/Filters.slice";

const Filters = () => {
    const filters = useSelector((state: RootState) => state.filters)
    const dispatch = useDispatch();

    return (
        <div>
            <Typography.Title>Filters</Typography.Title>
            <div>
                <DatePicker value={filters.startingDate} onChange={date => dispatch(setStartingDate(date))} />
            </div>
            <div>
                <DatePicker value={filters.endingDate} onChange={date => dispatch(setEndingDate(date))} />
            </div>
        </div>
    )
}

export default Filters;