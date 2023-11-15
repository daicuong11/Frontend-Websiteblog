import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import "./MySearch.scss";
import { useState } from 'react';

const MySearch = () => {

    const [onFocus, setOnFocus] = useState(false);
    const [valueSearch, setValueSearch] = useState('');

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
                    onChange={(event) => setValueSearch(event.target.value)}
                    type='text' className='text-sm search-input h-full px-1 outline-none grow' placeholder='Tìm kiếm bài viết, tác giả,...' />
                {valueSearch.length > 0 && (<div onClick={() => setValueSearch('')} className='py-2 pl-1 flex justify-center items-center cursor-pointer'>
                    <FontAwesomeIcon className='text-slate-500' size='sm' icon={faXmark} />
                </div>)}
            </div>
        </div>
    </>)
}

export default MySearch;