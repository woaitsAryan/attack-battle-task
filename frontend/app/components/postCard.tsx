import React from 'react';
import { PostType } from '../../lib/types';
import truncate from '../../lib/trunacate';

interface Props {
    post: PostType;
    type?:string;
}

const PostCard = (props: Props) => {
    return (
        <div className={`${props.type ? "w-full" : "w-[45%]"} relative overflow-clip bg-white hover:bg-gray-100  dark:bg-transparent font-primary flex flex-col gap-1 rounded-lg dark:rounded-none text-black border-gray-300 border-b-[1px]  p-4 max-md:p-2`}>
            <div className="text-xl font-semibold">{truncate(props.post.title, 50)}</div>
            <div className="text-gray-400 text-sm">{truncate(props.post.content, 200)}</div>
            <div className = "flex flex-row justify-between mt-4">
                <div className="text-sm text-gray-500">{new Date(props.post.createdAt).toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">{props.post.authorId.name}</div>
            </div>

        </div>
    );
};

export default PostCard;