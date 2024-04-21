import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { SearchBarProps } from './search-bar.types';

const { Option } = Select;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagChange = (tags: string[]) => {
        setSelectedTags(tags);
    };

    const handleSearchClick = () => {
        onSearch(selectedTags);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select
                size={'large'}
                mode="tags"
                style={{ flex: 1 }}
                placeholder="Type and press Enter to add tags"
                onChange={handleTagChange}
                tokenSeparators={[' ', ',']}
                value={selectedTags}
            >
                {selectedTags.map(tag => (
                    <Option key={tag} value={tag}>
                        {tag}
                    </Option>
                ))}
            </Select>
            <Button type="primary" size={'large'} onClick={handleSearchClick} className="ml-4">
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
