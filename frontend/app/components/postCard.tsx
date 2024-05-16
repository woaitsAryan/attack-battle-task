import React from 'react';
import { PostType } from '@/lib/types';
import truncate from '@/lib/trunacate';

interface Props {
    post: PostType;
}

const PostCard = (props: Props) => {
    return (
        <div className="w-full relative overflow-clip bg-white dark:bg-transparent font-primary flex flex-col gap-1 rounded-lg dark:rounded-none text-black border-gray-300 border-[1px] dark:border-x-0 dark:border-t-0 dark:border-dark_primary_btn dark:border-b-0 p-4 max-md:p-2">
            <div className="text-xl font-semibold">{truncate(props.post.title, 30)}</div>
            <div className="text-gray-400">{truncate(props.post.content, 50)}</div>
            <div className = "flex flex-row justify-between">
                <div className="text-sm text-gray-500">{new Date(props.post.createdAt).toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">{props.post.authorId.name}</div>
            </div>

        </div>
    );
};

export default PostCard;