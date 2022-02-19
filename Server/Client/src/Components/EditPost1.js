import React, { Component } from "react";
import axios from "axios";
export default class EditPost extends Component {

  constructor(props) {
    super(props);
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
    const id = this.props.match.params.id;
    const { topic, description, postCategory } = this.state;
    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory,
    };

    axios
      .put(`http://localhost:8000/PostRoute/updatePostDetails/${id}`, data)
      .then((res) => {

        if (res.data.success) {
          alert("Post updated sucessfully!!")
          this.setState({
            topic: "",
            description: "",
            postCategory: "",
          });
      }
       
      });
  };


  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:8000/PostRoute/getPostDetails/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            topic:res.data.post.topic,
            description:res.data.post.description,
            postCategory:res.data.post.postCategory,
          });
       
        }
      });
  }
  render() {
    return (
      <div class="create-form container mt-4">
        <div class="card">
          <div class="card-header">
            <h6>Edit Post</h6>
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
                    placeholder="Enter Your Topic"
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
                    placeholder="Description of Topic"
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
                    placeholder="Category"
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
