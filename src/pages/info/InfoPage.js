import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import ListArticleLovest from "../../components/project/list_article/ListArticleLovest";

const InfoPage = () => {
    const userID = useParams();
    console.log(userID);
    return userID && (
        <div className="w-[1100px] box-border mx-auto min-h-screen mb-5">
            <div className="h-[308px] bg-cover bg-center rounded-2xl relative bg-[url('http://localhost:3000/bg-blog.webp')]">
                <div className="absolute -bottom-[calc(50%-166px/2)] left-10 flex justify-center gap-4">
                    <div className="p-2 rounded-full bg-white">
                        <img className="w-[150px] h-[150px] rounded-full" src='/color.jpg' alt='' />
                    </div>
                    <div className="mt-auto font-bold text-[28px] mb-4">Đại Cương</div>
                </div>
            </div>
            <div className="mt-[90px] px-6 grid grid-cols-5 gap-6">
                <div className="col-span-2">
                    <div className="border-[1px] border-gray-200 border-opacity-70 p-4 shadow-md rounded-md">
                        <h3 className="font-semibold text-base">Giới thiệu</h3>
                        <div className="">
                            <ul className="mt-2 list-inside">
                                <li className="text-sm">
                                    <FontAwesomeIcon color="gray" icon={faUserGroup} />
                                    <span className="ml-2 text-black">Thành viên của BLOG từ một ngày trước</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 border-[1px] border-gray-200 border-opacity-70 p-4 shadow-md rounded-md">
                        <h3 className="font-semibold text-base">Hoạt động gần đây</h3>
                        <div className="">
                            <ul className="mt-3 list-inside">
                                <li className="text-sm flex">
                                    <div className="">
                                        <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] border-[3px] border-r-red-500 border-t-yellow-500 border-b-red-500 border-l-red-500 rounded-full" alt="/color.jpg" src={"/color.jpg"} />
                                    </div>
                                    <div className="ml-2 text-black">
                                        <div className="font-semibold">
                                            Đại Cương
                                            <p className="inline font-normal ml-1 line-clamp-4 cursor-pointer hover:underline">
                                                đã thả tim bài viết Người nổi tiếng.
                                                đã thả tim bài viết Người nổi tiếng.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="my-3">
                                    <hr />
                                </li>
                                <li className="text-sm flex">
                                    <div className="">
                                        <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] border-[3px] border-r-red-500 border-t-yellow-500 border-b-red-500 border-l-red-500 rounded-full" alt="/color.jpg" src={"/color.jpg"} />
                                    </div>
                                    <div className="ml-2 text-black">
                                        <div className="font-semibold">
                                            Đại Cương
                                            <p className="inline font-normal ml-1 line-clamp-4 cursor-pointer hover:underline">
                                                đã thả tim bài viết Người nổi tiếng.
                                                đã thả tim bài viết Người nổi tiếng.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="border-[1px] border-gray-200 border-opacity-70 p-4 shadow-md rounded-md">
                        <h3 className="font-semibold text-base">Top 3 bài viết được yêu thích nhất</h3>
                        <div className="">
                            {/* <ul className="mt-2 list-inside">
                                <li className="text-sm">
                                    <FontAwesomeIcon color="gray" icon={faUserGroup} />
                                    <span className="ml-2 text-black">Thành viên của F8 - Học lập trình để đi làm từ một năm trước</span>
                                </li>
                            </ul> */}
                            <ListArticleLovest 
                                categoryID={1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoPage;