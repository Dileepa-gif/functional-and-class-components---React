import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
    const history = useHistory(); 
    const [postData, setPostData] = useState({ topic: '', description: '', postCategory: '' });
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(postData);
    
        axios
          .post("http://localhost:8000/PostRoute/createPost", postData)
          .then((res) => {
            setPostData({ topic: '', description: '', postCategory: '' });
            history.push("/");
          });
      };

    return (
      <div class="create-form container mt-4">
        <div class="card">
          <div class="card-header">
            <h6>Create Post</h6>
          </div>
          <div class="card-body">
            <form action="" method="post" onSubmit={onSubmit}>
              <div class="form-group row">
                <label for="topic" class="form-label">
                  Topic
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="topic"
                    placeholder=""
                    required
                    value={postData.topic}
                    onChange={(e) => setPostData({ ...postData, topic: e.target.value })}
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="description" class="form-label">
                  Description
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="description"
                    placeholder=""
                    required
                    value={postData.description}
                    onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="postCategory" class="form-label">
                  Post Category
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="postCategory"
                    placeholder=""
                    required
                    value={postData.postCategory}
                    onChange={(e) => setPostData({ ...postData, postCategory: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-outline-primary"
              >
                {/* <i className="far fa-check-squre"></i>
                    &nbsp; */}
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};
export default CreatePost;
