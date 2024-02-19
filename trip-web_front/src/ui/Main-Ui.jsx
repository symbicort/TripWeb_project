import { useState, useEffect } from 'react';
import { Main_function, National_list } from '../util/mainList';
import visual from '../assets/visual.jpg';
import Input from '../components/SearchInput'

import '../styles/MainUi.css';

const MainUi = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSearchHistory, setShowSearchHistory] = useState(false);

    const searchData = [...Main_function];

    const searchHandler = (e) => {
        const value = e.target.value;
        setSearch(value);

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

    useEffect(() => {
        const savedSearchHistory = localStorage.getItem('searchHistory');
        if (savedSearchHistory) {
            setSearchHistory(JSON.parse(savedSearchHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    const listHistory = () => {
        if (search.trim() !== '') {
            setSearchHistory([...searchHistory, search]);
        }
    };

    const removeSearchHistory = (index) => {
        const updatedSearchHistory = searchHistory.filter((item, i) => i !== index);
        setSearchHistory(updatedSearchHistory);
    };

    return (
        <div className="Main-Container">
    <div className="visual">
        <div className="search-bar-container">
            <Input 
                type = 'text'
                value={search}
                onChange={searchHandler}
                placeholder="검색어를 입력하세요"
                onClick={() => setShowSearchHistory(true)}
            />
            {showSearchHistory && (
                <div className="search-history-container">
                    <ul className="search-history-list">
                        {searchHistory.map((item, index) => (
                            <li key={index} className="search-history-item">
                                <span className="search-history-text">{item}</span>
                                <button className="search-history-remove" onClick={() => removeSearchHistory(index)}>x</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button type="button" className="search-button" onClick={listHistory}>
                검색
            </button>
        </div>
        <img src={visual} alt="visual" className="visual-image" />
    </div>
    <div className="Main_first">
        <h2>Trip&Trap에서 여행을 시작하세요!</h2>
        <div className="Main_card">
            {searchResults.length > 0 ? (
                searchResults.map((item) => (
                    <div className="card" key={item.id}>
                        <img src={item.image} alt="img" className="card-image" />
                        <div className="card-content">
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-description">{item.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                Main_function.map((item) => (
                    <div className="card" key={item.id}>
                        <img src={item.image} alt="img" className="card-image" />
                        <div className="card-content">
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-description">{item.description}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
        <p>사용방법이 궁금하신가요?</p>
    </div>
    
    {/* second */}
    <div className='Main_second'>
        <h2>인기 여행일정</h2>
        <div className="Second-card">
            <div className='card'>
            <img src="이미지 URL" alt="이미지 설명" className="second-card-image" />
            <div className="second-card-content">
                <h2 className="second-card-title">타이틀</h2>
                <div className="second-card-info">
                    <span className="second-share-info">공유: 링크 타고 들어온 사람</span>
                    <span className="second-comment-info">댓글: 댓글 수</span>
                </div>
                <div className="second-user-info">
                    <span className="second-username">사용자 닉네임</span>
                    <span className="second-subtitle">서브 타이틀</span>
                </div>
            </div>
            </div>
            
        </div>
    </div>
</div>
    );
};

export default MainUi;
