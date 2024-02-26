import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {selectSearchInput, selectBlogData, setBlogData} from "../features/userSlice";
import "../styling/Blogs.css";

const Blogs = () => {
  const searchInput = useSelector(selectSearchInput);
  const blogData = useSelector(selectBlogData);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=504ca1b4296aa07ea725688163acc4b6`;
  //const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios.get(blog_url).then((response) => {
        dispatch(setBlogData(response.data));
        //setBlogs(response.data);
        setLoading(false);
    })
    .catch((error) => {
        console.log(error);
    });
  }, [searchInput])
  return (
    <div className="blog__page">
        <h1 className='blog__page__header'>Blogs</h1>
        {loading ? <h1 className='loading'>Loading...</h1> : ""}
        <div className='blogs'>
            {blogData?.articles?.map((blog) => (
                <a className="blog" target="_blank" href={blog.url}>
                    <img src={blog.image} />
                    <div>
                        <h3 className="sourceName">
                            <span>{blog.source.name}</span>
                            <p>{blog.publishesAt}</p>
                        </h3>
                        <h1>{blog.title}</h1>
                        <p>{blog.description}</p>
                    </div>
                </a>
            ))}

            {blogData?.totalArticles === 0 && (
                <h1 className="no__blogs">
                    No blogs available 😞. Search something else to read blogs on the
                    greatest platform.
                </h1>
            )}
        </div>
    </div>
  );
}
export default Blogs;
