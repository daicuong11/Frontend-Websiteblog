import { useState } from "react";
import Content from "../article_content/Content";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAbsolute from "../../modal/ModalAbsolute";
import { useContext } from "react";
import { MyContext, useMycontext } from "../context/MyContextProvider";
import { toast } from "react-toastify";

const NewPostContent = () => {
    const { listDataContent, setListDataContent } = useMycontext();
    // const [listDataContent, setListDataContent] = useState([]);
    const [showAddContent, setShowAddContent] = useState(false);
    const [indexContent, setIndexContent] = useState(1);
    const [contentTitle, setContentTitle] = useState(`${indexContent}. `);
    const [contentBody, setContentBody] = useState('');
    const [contentImage, setContentImage] = useState();

    const handleCloseAddContent = () => {
        setShowAddContent(false);

    };

    const handleAddNewContent = () => {
        handleCloseAddContent();
        // Add the entered content to the list
        if (contentTitle.trim() === '' && contentBody.trim() === '' && !contentImage) {
            toast.error('không tạo')
            return;
        }
        const newContent = {
            id: indexContent || '',
            title: contentTitle || '',
            body: contentBody || '',
            image: contentImage || null,
        };

        setIndexContent(indexContent + 1);
        setListDataContent((prevList) => [...prevList, newContent]);
    }

    const handleClearContent = () => {
        // Reset the input fields
        setContentTitle(`${indexContent}. `);
        setContentBody('');
        setContentImage(null);
    }

    const handleEditContent = (content) => {
        if (content.title.trim() === '' && content.body.trim() === '' && !content.image) {
            toast.error('Xóa content');
            const newListDataContent = listDataContent.filter(c => c.id !== content.id);
            setListDataContent(newListDataContent);
        } else {
            const newListDataContent = listDataContent.map(c => (c.id === content.id ? content : c));
            setListDataContent(newListDataContent);
        }
    };
    

    // console.log('listDataContent', listDataContent)

    return (
        <div className="px-3 my-5">
            <div className="flex-col mb-4 h-full">
                {/* list content */}
                <div id="list-new-article-content">
                    {listDataContent.map((content, index) => (
                        <Content
                            key={index}
                            content={content}
                            handleEditContent={handleEditContent}
                        />
                    ))}
                </div>
                <div className="mt-5 relative">
                    <button onClick={() => { setShowAddContent(!showAddContent); handleClearContent(); }} className="w-11 h-11 bg-blue-600 rounded-full cursor-pointer hover:text-xl transition-all">
                        {showAddContent ? <FontAwesomeIcon color="white" size="xl" icon={faXmark} /> : <FontAwesomeIcon color="white" icon={faPlus} />}
                    </button>
                    <ModalAbsolute
                        className={'w-[652px] top-[60px] left-[0px] z-[1000] bg-white'}
                        onOpen={showAddContent}
                        onClose={handleCloseAddContent}
                        showIconClose={true}
                        modalHead={(<div className="text-center font-semibold">
                            Thêm nội dung
                        </div>)}
                        modalBody={(<div className="px-4">
                            <hr />
                            <div className="mb-5">
                                <div className="my-5">
                                    <div className="font-semibold">Tiêu đề</div>
                                    <input type="text" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} className="w-full mt-2 border-2 px-[16px] py-[6px] rounded focus:border-orange-500" />
                                </div>
                                <div className="my-5">
                                    <div className="font-semibold">Nội dung</div>
                                    <textarea
                                        style={{ height: `${contentBody.split('\n').length * 40}px` }}
                                        type="text"
                                        value={contentBody}
                                        onChange={(e) => setContentBody(e.target.value)}
                                        className="w-full mt-2 border-2 px-[16px] py-[6px] h-auto rounded focus:border-orange-500"
                                    />

                                </div>
                                <div className="mt-5">
                                    <div className="font-semibold">Hình ảnh</div>
                                    <input type="file" accept="image/*" className="w-full border-2" onChange={(e) => setContentImage(e.target.files[0])} />
                                </div>

                                <div className="mt-5">
                                    <div className="flex justify-between items-center">
                                        <div></div>
                                        <button onClick={() => handleAddNewContent()} className="px-[16px] py-[6px] bg-orange-600 text-white rounded-md">
                                            Thêm vào
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    />
                </div>

            </div>
        </div>
    )
}

export default NewPostContent;
