import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Content.scss";
import { useState } from "react";
import ModalAbsolute from "../../modal/ModalAbsolute";
import { toast } from "react-toastify";

const Content = ({ content, handleEditContent }) => {
    const [showModalEditContent, setShowModalEditContent] = useState(false);
    const [contentTitle, setContentTitle] = useState(`${content.title}`);
    const [contentBody, setContentBody] = useState(`${content.body}`);
    const [contentImage, setContentImage] = useState(content.image);


    const handleClickEditContent = () => {
        const newContent = {
            id: content.id,
            title: contentTitle || '',
            body: contentBody || '',
            image: contentImage || null,
        }
        handleEditContent(newContent);
        setShowModalEditContent(false);
    }

    const handleCloseModalEditContent = () => {
        setShowModalEditContent(false);
        // Reset the input fields
        if (content) {
            setContentTitle(content.title);
            setContentBody(content.body);
            setContentImage(content.image);
        }
    }

    return content && (
        <div className={`main-content relative ${showModalEditContent ? 'border-2 border-black' : ''} content-article flex-col mt-5 hover:border-2 hover:border-gray-500 rounded-lg`}>
            {content.title && <h3 className="text-xl font-bold my-5">{content.title}</h3>}
            {content.body && <p dangerouslySetInnerHTML={{ __html: contentBody.replace(/\n/g, '<br/>') }} className="text-lg my-[6px] leading-8"></p>}
            {
                content.image &&
                <div>
                    <img alt="" src={URL.createObjectURL(content.image)} className="w-full mt-8 mb-10" />
                </div>
            }
            <div onClick={() => setShowModalEditContent(!showModalEditContent)} className={`${showModalEditContent ? 'show' : ''} btn-edit-content hidden absolute top-0 right-0`}>
                <button className="px-2 py-1">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>

            <ModalAbsolute
                className={'w-[652px] top-[40px] right-[0px] z-[1000] bg-white'}
                onOpen={showModalEditContent}
                onClose={handleCloseModalEditContent}
                showIconClose={true}
                modalHead={(<div className="text-center font-semibold text-xl">
                    Chỉnh sửa nội dung
                </div>)}
                modalBody={(<div className="px-4">
                    <hr />
                    <div className="mb-5">
                        <div className="my-5">
                            <div className="font-semibold">Tiêu đề</div>
                            <input type="text" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} className="w-full mt-2 border-2 px-[16px] py-[6px] rounded-md focus:border-orange-500" />
                        </div>
                        <div className="my-5">
                            <div className="font-semibold">Nội dung</div>
                            <textarea
                                style={{ height: `${contentBody.split('\n').length * 40}px` }}
                                type="text"
                                value={contentBody}
                                onChange={(e) => setContentBody(e.target.value)}
                                className="w-full mt-2 border-2 px-[16px] py-[6px] h-auto rounded-md focus:border-orange-500"
                            />

                        </div>
                        <div className="mt-5">
                            <div className="font-semibold">Hình ảnh</div>
                            <div className="mb-2 ml-2">

                                <label className="my-4">
                                    <button className="mr-4 hover:text-orange-500" onClick={() => setContentImage(null)} >
                                        Bỏ hình ảnh hiện có - {contentImage ? <span>{contentImage.name}</span> : <span>Không có ảnh</span>}
                                    </button>
                                </label>
                            </div>
                            <input type="file" accept="image/*" className="w-full border-2 rounded-md py-0.5 px-0.5 cursor-pointer" onChange={(e) => setContentImage(e.target.files[0])} />
                        </div>


                        <div className="mt-5">
                            <div className="flex justify-between items-center">
                                <div></div>
                                <button onClick={() => handleClickEditContent()} className="px-[16px] py-[6px] bg-orange-600 text-white rounded-md">
                                    Lưu lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}
            />
        </div >
    );
};

export default Content;
