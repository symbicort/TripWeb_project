import { useState, useEffect } from 'react';
import { Main_function, Main_function2  } from '../util/mainList';
import visual from '../assets/visual.jpg';
import Input from '../components/SearchInput';

import '../styles/MainUi.css';

const MainUi = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([...Main_function, ...Main_function2]);

    const searchData = [...Main_function, ...Main_function2];

    const searchHandler = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (search.trim() === '') {
            setSearchResults([...Main_function, ...Main_function2]);
            return;
        }

        const newSearch = searchData.filter((item) => {
            for (const key in item) {
                const fieldValue = item[key];
                if (fieldValue.includes(value)) {
                    return true;
                }
            }
            return false;
        });

        setSearchResults(newSearch);
    };



    return (
        <div className="Main-Container">
            <div className="visual">
                <div className="search-bar-container">
                    <Input 
                        type='text'
                        value={search}
                        onChange={searchHandler}
                        placeholder="검색어를 입력하세요"
                    />
                </div>
                <img src={visual} alt="visual" className="visual-image" />
            </div>
            <div className="Main_first">
                <h2>Trip&Trap에서 여행을 시작하세요!</h2>
                <div className="Main_card">
                    {searchResults.length > 0 ?  searchResults.map((item) => (
                        <div className="card" key={item.id}>
                            <img src={item.image} alt="img" className="card-image" />
                            <div className="card-content">
                                <h2 className="card-title">{item.title}</h2>
                                <p className="card-description">{item.description}</p>
                            </div>
                        </div>
                    ))
                    : <p>검색결과가 없습니다만?</p>
                    }
                </div>
                <p>사용방법이 궁금하신가요?</p>
            </div>
            
            {/* second */}
            <div className='Main_second'>
                <h2>인기 여행일정</h2>
                <div className="Second-card">
                    {/* 여기에 인기 여행일정 표시 */}
                </div>
            </div>
        </div>
    );
};

export default MainUi;
