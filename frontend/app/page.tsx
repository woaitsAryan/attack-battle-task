import { PostType } from '@/lib/types';
import PostCard from './components/postCard';

const MainPage = async () => {
    const posts = await getData() as PostType[]

    return (
        <main className="h-full flex flex-col justify-center items-center w-full">
            <div className="w-[70%] max-lg:w-full h-full min-h-screen font-primary py-8 px-8 flex flex-col justify-center items-center">
                <div className="w-3/5 max-md:w-full flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <div className="text-2xl font-semibold">All blog posts</div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

async function getData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?page=1&limit=10`)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        const posts = (await res.json()).posts
        return posts
    } catch (error) {
        console.error(error)
        return []
    }
}

export default MainPage;