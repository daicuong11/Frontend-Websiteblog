import { useState } from "react";

const NotifyCard = ({image, title, time}) => {
    const [flagIsClicked, setFlagIsClicked] = useState();

    const handleClicked = () => {
        setFlagIsClicked(true);
    }
    return (<>
        <div onClick={() => handleClicked()} className="relative cursor-pointer">
            <div className={`m-2 py-2 pr-8 flex transition-all rounded-lg ${flagIsClicked ? 'hover:bg-gray-100' : 'bg-red-100 bg-opacity-50'}`}>
                <div className="px-3 py-2">
                    <img className="rounded-full w-[42px] h-[42px] min-w-[42px] min-h-[42px]" alt="" src={`${image ||'/color.jpg'}`} />
                </div>
                <div className="flex flex-col justify-between items-start w-full">
                    <div className="text-sm">Bài học <span className="font-semibold">{title || 'Lớp học Offline tại Hà Nội'}</span> mới được thêm vào.</div>
                    <div className="text-xs mt-1 text-orange-500 font-semibold">
                        {time || '3 ngày trước'}
                    </div>
                </div>
            </div>
            {flagIsClicked || (<>
                <span className="animate-ping absolute top-[34px] right-[14px] inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                <span className="absolute top-[36px] right-4 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </>)}
        </div>
    </>)
}

export default NotifyCard;