import NewPostContent from "../../components/project/new_post/NewPost";


const NewPostPage = ({typePost}) => {
    
    return (
        <div className="mt-[66px] px-11 bg-slate-100 min-h-screen">
            <div className="grid grid-cols-12">
                <div className="col-span-3 sticky top-[66px] h-fit">
                    
                </div>
                <div className="col-span-6 my-8 rounded-lg shadow-[0_0px_10px_10px_rgba(0,0,0,0.05)] bg-white">
                    <NewPostContent 
                    />
                </div>
                <div className="col-span-3 sticky top-[66px] h-1">

                </div>
            </div>
        </div>
    )
}

export default NewPostPage;