import React, { Component } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
  //  const history = useHistory();  
    this.state = {
      topic: "",
      description: "",
      postCategory: "",
    };
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { topic, description, postCategory } = this.state;
    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory,
    };
    // console.log(data);

  
    axios
      .post("http://localhost:8000/PostRoute/createPost", data)
      .then((res) => {
        this.setState({
          topic: "",
          description: "",
          postCategory: "",
        });
        //  history.push("/");
      });
  };

  render() {
    return (
      <div class="create-form container mt-4">
        <div class="card">
          <div class="card-header">
            <h6>Create Post</h6>
          </div>
          <div class="card-body">
            <form action="" method="post">
              <div class="form-group row">
                <label for="topic" class="form-label">
                  Topic
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="topic"
                    className="formcontrol"
                    placeholder=""
                    required
                    value={this.state.topic}
                    onChange={this.handleInputChange}
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
                    className="formcontrol"
                    placeholder=""
                    required
                    value={this.state.description}
                    onChange={this.handleInputChange}
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
                    className="formcontrol"
                    placeholder=""
                    required
                    value={this.state.postCategory}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-outline-primary"
                onClick={this.onSubmit}
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
  }
}
