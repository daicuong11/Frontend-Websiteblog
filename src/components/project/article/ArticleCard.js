

const ArticleCard = ({title, description, status}) => {

    return (<>
        <div className="cursor-pointer m-2 flex hover:bg-gray-100 transition-all rounded-lg">
            <div className="px-3 py-2">
                <img className="rounded-lg w-[120px] h-[68px] min-w-[120px] min-h-[68px]" alt="" src="/color.jpg" />
            </div>
            <div className="flex flex-col justify-center items-start w-full">
                <div className="text-sm font-semibold">{title || 'Cách code React'}</div>
                <div className="text-xs mt-1 text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis w-[210px]">
                    {description || 'React là một thư viện JavaScript front-end mã nguồn mở và miễn phí để xây dựng giao diện người dùng dựa trên các thành phần UI riêng lẻ. Nó được phát triển và duy trì bởi Meta và cộng đồng các nhà phát triển và công ty cá nhân.'}
                </div>
                <div className="flex items-center mt-2">
                    <span className="mr-2 text-sm">Trạng thái: </span>
                    <div className={`text-xs px-2 border rounded-md uppercase ${(status === 'PUBLISHED') ? 'bg-green-200 border-green-600 text-green-700' : 'bg-red-200 border-red-500 text-red-600'}`}>Đang chờ</div>
                </div>
            </div>
        </div>
    </>)
}

export default ArticleCard;