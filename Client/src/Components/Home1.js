import React, { Component } from "react";
import axios from "axios";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("http://localhost:8000/PostRoute/getAllPostDetails")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            posts: res.data.existingPost,
          });

          // console.log(this.state.posts);
        }
      });
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:8000/PostRoute/deletePost/${id}`)
      .then((res) => {
        alert("Deleted Sucessfully");
        this.retrievePosts();
      });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      (post) =>
        post.topic.toLowerCase().includes(searchKey) ||
        post.description.toLowerCase().includes(searchKey) ||
        post.postCategory.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios
      .get("http://localhost:8000/PostRoute/getAllPostDetails")
      .then((res) => {
        if (res.data.success) {
          this.filterData(res.data.existingPost, searchKey);
        }
      });
  };

  render() {
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
            onChange={this.handleSearchArea}
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
            {this.state.posts.map((posts, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/post/${posts._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {posts.topic}
                    </a>
                  </td>
                  <td>{posts.description}</td>
                  <td>{posts.postCategory}</td>
                  <td>
                    <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                      <i className="fas fa-edit"></i> Edit
                    </a>
                    {"  "}
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(posts._id)}
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
  }
}
