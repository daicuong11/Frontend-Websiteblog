
const ArticleCard = ({ article, hidenStatus, hoverText }) => {

    return (
        article &&
        <div  onClick={() => window.location.href = `/article/${article.articleID}`} className="cursor-pointer m-2 flex hover:bg-gray-100 transition-all rounded-lg h-full">
            <div className="px-3 py-2">
                <img className="rounded-lg w-[120px] h-[68px] min-w-[120px] min-h-[68px]" alt="" src={article ? `https://localhost:7020/api/images/${article.imagePath}` : "/color.jpg"} />
            </div>
            <div className="flex flex-col justify-center items-start">
                <div className={`text-sm font-semibold line-clamp-2 ${hoverText ? 'hover:text-orange-500' : ''}`}>{article ? article.title : 'Cách code React'}</div>
                <div className="text-xs mt-1 text-gray-500 mr-2 line-clamp-1">
                    {article ? article.description : 'React là một thư viện JavaScript front-end mã nguồn mở và miễn phí để xây dựng giao diện người dùng dựa trên các thành phần UI riêng lẻ. Nó được phát triển và duy trì bởi Meta và cộng đồng các nhà phát triển và công ty cá nhân.'}
                </div>
                {hidenStatus ||
                    <div className="flex items-center my-1">
                        <span className="mr-2 text-xs">Trạng thái: </span>
                        <div className={`text-xs px-[6px] border rounded-md uppercase ${(article.status === 'PUBLISHED') ? 'bg-green-100 border-green-500 text-green-500' : 'bg-red-100 border-red-500 text-red-500'}`}>{article ? article.status : 'đang chờ'}</div>
                    </div>}
            </div>
        </div>
    )
}

export default ArticleCard;