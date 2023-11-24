import { useContext, useEffect, useState } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostProps } from './PostList';

export default function PostForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.id) {
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString(),
        });
        navigation(`/posts/${post.id}`);
        toast.success('게시글을 수정했습니다.');
      } else {
        await addDoc(collection(db, 'posts'), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleDateString(),
          email: user?.email,
          uid: user?.uid,
        });
        navigation('/');
        toast.success('게시글을 생성했습니다.');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'summary') {
      setSummary(value);
    }

    if (name === 'content') {
      setContent(value);
    }
  };

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
    }
  }, [post]);

  return (
    <form onSubmit={onSubmit} className='form'>
      <div className='form__block'>
        <label htmlFor='title'>제목</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='summary'>요약</label>
        <input
          type='text'
          id='summary'
          name='summary'
          value={summary}
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='content'>내용</label>
        <textarea
          id='content'
          name='content'
          value={content}
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <input
          type='submit'
          value={post ? '수정' : '등록'}
          className='form__btn--submit'
        />
      </div>
    </form>
  );
}
