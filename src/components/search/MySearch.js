import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import "./MySearch.scss";
import { useState } from 'react';
import ModalAbsolute from '../modal/ModalAbsolute';
import Loading from '../loading/LoadingSpinner';
import { fetchSearchArticleBySearchKey } from '../../services/ArticleService';
import { useNavigate } from 'react-router-dom';
import MyModal from '../modal/MyModal';
import { useEffect } from 'react';

const MySearch = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModalSearchResult, setIsOpenModalSearchResult] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [listArticleBySearch, setListArticleBySearch] = useState([]);

    // Debouncing logic
    useEffect(() => {
        const timerId = setTimeout(() => {
            handleOpenModalSearchResult(valueSearch);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [valueSearch]);

    //handle close modal search result
    const handleOpenModalSearchResult = async (value) => {
        console.log(value);
        if (value.length === 0) {
            setListArticleBySearch([]);
            handleCloseModalSearchResult();
        } else if (value.length < 2) {
            setListArticleBySearch([]);
            setIsOpenModalSearchResult(true);
        } else {
            setIsOpenModalSearchResult(true);
            setIsLoading(true);

            let res = await fetchSearchArticleBySearchKey(value);
            if (res.status === true) {
                setListArticleBySearch(res.data);
            }

            setIsLoading(false);
        }
    };

    //handle close modal search result
    const handleCloseModalSearchResult = () => {
        setIsOpenModalSearchResult(false);
    };

    return (<>
        <div className={`search-container w-[420px] h-[40px] border-2 rounded-full transition-all ${onFocus ? 'border-black' : ''}`}>
            <div className='w-full h-full pl-2 pr-4 flex items-center'>
                <div className='w-[30px] h-8 flex justify-center items-center'>
                    <FontAwesomeIcon className='text-slate-500' size='lg' icon={faMagnifyingGlass} />
                </div>
                <input
                    onFocus={() => setOnFocus(true)}
                    onBlur={() => setOnFocus(false)}
                    value={valueSearch}
                    onChange={(event) => { setValueSearch(event.target.value); handleOpenModalSearchResult(event.target.value); }}
                    type='text' className='text-sm search-input h-full px-1 outline-none grow' placeholder='Tìm kiếm bài viết, tác giả,...' />
                {valueSearch.length > 0 && (<div onClick={() => { setValueSearch(''); handleCloseModalSearchResult(); }} className='py-2 pl-1 flex justify-center items-center cursor-pointer'>
                    <FontAwesomeIcon className='text-slate-500' size='sm' icon={faXmark} />
                </div>)}
            </div>
        </div>

        <MyModal
            onOpen={isOpenModalSearchResult}
            onClose={handleCloseModalSearchResult}
            className={'w-[420px] left-[calc(50%-420px/2)] transition-all top-[60px] z-[1000] bg-white'}
            modalHead={<div className='text-sm text-gray-500 line-clamp-3 flex items-center'>
                {isLoading ?
                    <Loading
                        className={'h-6 w-6'}
                    />
                    :
                    <FontAwesomeIcon icon={faSearch} />
                }
                <div className='ml-2'>Kết quả cho {valueSearch}</div>
            </div>}
            modalBody={
                listArticleBySearch && listArticleBySearch.length > 0 &&
                (
                    <div className='px-5'>
                        <div className='font-semibold uppercase text-sm mb-2'>Bài viết</div>
                        <hr />
                        <div className='flex-col my-2'>
                            {/* render kết quả tìm kiếm */}
                            {
                                listArticleBySearch.map((article, index) => {
                                    return (
                                        <div key={index} onClick={() => navigate(`/article/${article.articleID}`)} className='flex items-center py-2 cursor-pointer'>
                                            <div>
                                                <img alt='' src={`https://localhost:7020/api/images/${article.imagePath}`}
                                                    className='w-8 h-8 min-w-[32px] min-h-[32px] rounded-full object-cover' />
                                            </div>
                                            <div className='ml-3 text-sm line-clamp-1'>{article.title}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )

                ||
                <div></div>
            }
        />
    </>)
}

export default MySearch;