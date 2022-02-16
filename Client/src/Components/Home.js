import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = (props) => {
    const history = useHistory(); 
    const [posts, setPosts] = useState([]);
    const [deletedId,setDeletedId]= useState('');

    
    useEffect(() => {
        axios
        .get("http://localhost:8000/PostRoute/getAllPostDetails")
        .then((res) => {
          if (res.data.success) {
            setPosts(res.data.existingPost)
          }
        });
    }, [deletedId]);

    const filterData= (posts, searchKey) => {
        const result = posts.filter(
          (post) =>
            post.topic.toLowerCase().includes(searchKey) ||
            post.description.toLowerCase().includes(searchKey) ||
            post.postCategory.toLowerCase().includes(searchKey)
        );
        setPosts(result);
      }


    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios
          .get("http://localhost:8000/PostRoute/getAllPostDetails")
          .then((res) => {
            if (res.data.success) {
              filterData(res.data.existingPost, searchKey);
            }
          });
      };
    const onDelete = (id) => {
      axios
        .delete(`http://localhost:8000/PostRoute/deletePost/${id}`)
        .then((res) => {
          alert("Deleted Successfully");
          setDeletedId(id);
        });
    };


    return (
        <div className="container">
        <br></br>
        <div class="input-group rounded">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={handleSearchArea}
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Description</th>
              <th scope="col">Post Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/post/${post._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {post.topic}
                    </a>
                  </td>
                  <td>{post.description}</td>
                  <td>{post.postCategory}</td>
                  <td>
                    <a className="btn btn-warning" href={`/edit/${post._id}`}>
                      <i className="fas fa-edit"></i> Edit
                    </a>
                    {"  "}
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => onDelete(post._id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn btn-success">
          {" "}
          <a href="/add" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            Create New Post
          </a>
        </button>
      </div>

    );
};
export default Home;
