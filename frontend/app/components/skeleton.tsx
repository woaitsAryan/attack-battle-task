const PostCardSkeleton = () => (
    <div className="w-full relative overflow-clip bg-white dark:bg-transparent font-primary flex flex-col gap-1 rounded-lg dark:rounded-none text-black border-gray-300 border-[1px] dark:border-x-0 dark:border-t-0 dark:border-dark_primary_btn dark:border-b-0 p-4 max-md:p-2">
        <div className="text-xl font-semibold bg-gray-200 animate-pulse">&nbsp;</div>
        <div className="text-gray-400 bg-gray-200 animate-pulse">&nbsp;</div>
        <div className="text-sm text-gray-500 bg-gray-200 animate-pulse">&nbsp;</div>
    </div>
);

export default PostCardSkeleton