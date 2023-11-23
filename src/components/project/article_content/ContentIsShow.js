import "./Content.scss";

const ContentIsShow = ({ content }) => {

    // console.log(content);
    return content &&(
        <div className={`flex-col mt-5`}>
            { content.contentTitle  && <h3 className="text-xl font-bold my-5">{content.contentTitle}</h3>}
            { content.contentBody && <p dangerouslySetInnerHTML={{ __html: content.contentBody.replace(/\n/g, '<br/>') }} className="text-lg my-[6px] leading-8"></p>}
            {
                content.contentImagePath &&
                <div>
                    <img alt="" src={`https://localhost:7020/api/images/${content.contentImagePath}`} className="w-full mt-8 mb-10" />
                </div>
            }

        </div >
    );
};

export default ContentIsShow;
