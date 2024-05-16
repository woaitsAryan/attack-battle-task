import { useState } from 'react';
import Modal from 'react-modal';
import { CreatePostType } from '@/lib/types';

interface CreatePostModalProps {
    onClose: () => void;
    onCreatePost: (post: CreatePostType) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onCreatePost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPost: CreatePostType = {
            title,
            content,
        };

        onCreatePost(newPost);
    };

    return (
        <Modal isOpen onRequestClose={onClose} className="flex items-center justify-center outline-none justify-self-center h-screen">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">Create a new post</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-2">
                        Title
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="border-2 border-gray-300 p-2 rounded-md" />
                    </label>
                    <label className="flex flex-col gap-2">
                        Content
                        <textarea value={content} onChange={e => setContent(e.target.value)} required className="border-2 border-gray-300 p-2 rounded-md h-32" />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Create Post</button>
                </form>
            </div>
        </Modal>
    );
};

export default CreatePostModal;