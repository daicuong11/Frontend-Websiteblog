

const ArticleCardL = ({ title, articleImagePath }) => {

    return (<>
        <div className="px-3 py-2 cursor-pointer m-2 flex-col hover:bg-gray-100 transition-all rounded-lg w-full h-full">
            <div className="">
                <img className="rounded-lg w-[282pxpx] h-[188px] min-w-[282px] min-h-[188px]" alt="" src={articleImagePath || `/color.jpg`} />
            </div>
            <p className="text-sm font-semibold hover:text-orange-600 mt-3 line-clamp-3">{title || 'Cách code React'}</p>
        </div>
    </>)
}

export default ArticleCardL;