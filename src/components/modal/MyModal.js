import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyNodal.scss";

const MyModal = ({ className, modalHead, textModalFoot, modalBody, onOpen, onClose, showIconClose, templateHead }) => {

    const handleBackdropClick = () => {
        onClose();
    };

    const handleContainerClick = (e) => {
        // Ngăn chặn nổi bọt sự kiện click từ con lên cha
        e.stopPropagation();
    };

    return (
        <>
            {onOpen && (
                <div
                    className='my-modal fixed top-0 bottom-0 left-0 right-0 z-[10000]'
                    onClick={handleBackdropClick}
                >
                    <div
                        className={`bg-white transform-gpu transition-all min-w-[200px] min-h-[20px] modal-container absolute shadow-[0_0px_10px_10px_rgba(0,0,0,0.08)] rounded-xl ${className}`}
                        onClick={handleContainerClick}
                    >
                        <div className="modal-head relative flex justify-between items-center my-4 px-[20px]">
                            <div className={`w-full ${showIconClose ? 'mr-6' : ''}`}>{templateHead ? (<div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">{templateHead.title}</h1>
                                <p className="text-sm text-orange-500 cursor-pointer py-1 px-2 rounded hover:bg-slate-100">{templateHead.action}</p>
                            </div>) : modalHead 
                                || <div>My modal</div>}</div>

                            {showIconClose &&
                                (
                                    <div onClick={() => onClose()} className="absolute -top-4 right-1 p-2 cursor-pointer">
                                        <FontAwesomeIcon size="xl" icon={faXmark} />
                                    </div>
                                )
                            }
                        </div>
                        {/* <hr /> */}
                        <div className="modal-body">
                            {modalBody || <div>This is body modal</div>}
                        </div>
                        {textModalFoot &&
                            (<div className="modal-foot h-[44px]">
                                <hr></hr>
                                <div className="flex justify-center items-center h-full">
                                    <button className="text-orange-600 text-sm font-semibold">{textModalFoot}</button>
                                </div>
                            </div>)}
                    </div>
                </div>
            )}
        </>
    );
};

export default MyModal;
