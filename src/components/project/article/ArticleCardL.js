

const ArticleCardL = ({ title, articleImagePath, description, isFlexRow }) => {

    return (<>
        <div className={`px-3 py-2 cursor-pointer m-2 ${isFlexRow ? 'flex' : 'flex-col'} hover:bg-gray-100 transition-all rounded-lg w-full h-full`}>
            <div className="">
                <img className="rounded-lg w-[282pxpx] h-[188px] min-w-[282px] min-h-[188px]" alt="" src={articleImagePath || `/color.jpg`} />
            </div>
            {
                isFlexRow ?
                    (
                        <div className="flex-col ml-4">
                            <p className="text-lg font-semibold hover:text-orange-600 mt-3 line-clamp-2">{title || 'Cách code React Cách code React Cách code React Cách code React Cách code React'}</p>
                            <p className="text-smmt-3 line-clamp-4">{description || 'Cách implement này tách biệt việc handle sign-in với việc quản lý phiên đăng nhập của user, sign-in không cần quan tâm sau khi sign-in xong ứng dụng sẽ xảy ra hành vi gì tiếp theo, việc quản lý phiên đăng nhập cụng không cần biết sign-in đăng nhập như thế nào.'}</p>
                        </div>
                    )
                    :
                    (
                        <p className="text-sm font-semibold hover:text-orange-600 mt-3 line-clamp-3">{title || 'Cách code React'}</p>
                    )
            }
        </div >
    </>)
}

export default ArticleCardL;