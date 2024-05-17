'use client'

import { useEffect, useState, Suspense } from 'react';
import { PostType, CreatePostType } from '../../lib/types';
import PostCard from '../components/postCard';
import CreatePostModal from '../components/CreatePostModal';
import Toaster from '../../lib/toast';
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation';
import backend from '../../lib/axios';
import getSubFromJwt from '../../lib/jwt';
import PostCardSkeleton from '../components/skeleton';

const Dashboard = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const toaster = Toaster.startLoad('Fetching posts');
        try {
            const token = Cookie.get('token')
            if (!token || token === undefined) {
                Toaster.stopLoad(toaster, "You are not signed in", 0);
                router.push('/login')
            }
            const userID = getSubFromJwt(token as string)
            if (!userID) {
                Toaster.stopLoad(toaster, "Invalid token", 0);
                router.push('/login')
            }
            backend.get(`/posts?author=${userID}&page=1&limit=10`)
                .then((res) => {
                    const postData = res.data.posts as PostType[]
                    if (postData.length === 0) {
                        Toaster.stopLoad(toaster, "No posts found", 0);
                        return;
                    }
                    Toaster.stopLoad(toaster, "Posts fetched", 1);
                    setPosts(res.data.posts)
                }).catch((err) => {
                    Toaster.stopLoad(toaster, "You are not signed in", 0);
                    router.push('/login')
                })
        } catch (err: any) {
            Toaster.stopLoad(toaster, "You are not signed in", 0);
            router.push('/login')
        }
    }, [router])

    const handleCreatePost = async (post: CreatePostType) => {
        const toaster = Toaster.startLoad('Creating post..');
        try {
            if(post.content.length < 10 || post.title.length < 5) {
                Toaster.stopLoad(toaster, "Invalid input", 0);
                return;
            }
            const token = Cookie.get('token')
            if (!token || token === undefined) {
                Toaster.stopLoad(toaster, "You are not signed in", 0);
                router.push('/login')
            }

            const response = await backend.post('/posts', post, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newPost = response.data.post as PostType
            Toaster.stopLoad(toaster, "Post created", 1);
            setPosts([...posts, newPost])

        } catch (err: any) {
            Toaster.stopLoad(toaster, "Failed to create post", 0);
        }
        setShowModal(false);
    };

    return (
        <main className="h-full flex flex-col justify-center items-center w-full">
            <div className="w-[50%] max-lg:w-full h-full min-h-screen font-primary py-8 px-8 flex flex-col justify-center items-center">
                <div className="w-3/5 max-md:w-full flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <div className="text-2xl font-semibold">Dashboard </div>
                        <div className="text-gray-400">Here are your posts</div>
                    </div>
                    <div className="w-full flex gap-4 flex-wrap">
                        <Suspense fallback={<PostCardSkeleton />}>
                            {posts.map((post, index) => (
                                <PostCard key={index} post={post} type="dashboard"/>
                            ))}
                        </Suspense>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full relative p-2 border-2 after:absolute after:-top-[3px] after:-left-[3px] after:-right-[3px] after:-bottom-[3.5px] after:-z-10 after:bg-[#395887] after:rounded-xl flex items-center cursor-pointer justify-center gap-2 bg-[#3D6DB3] hover:bg-[#345C98] active:bg-[#2D5185] border-[#d1d1d1a7] text-white py-2 rounded-xl font-semibold"
                    >
                        Create Post
                    </button>
                    {showModal && (
                        <CreatePostModal
                            onClose={() => setShowModal(false)}
                            onCreatePost={handleCreatePost}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;