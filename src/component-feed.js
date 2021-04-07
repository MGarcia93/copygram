import React from "react";
import Post from "./component-post";
import firebase from "firebase/app";
import "firebase/database";
import Loading from "./component-loading";

class FeedContent extends React.Component {
  state = {
    data: [],
    loading: true
  };
  getPost(){
    const db = firebase.database();
    db.ref("pictures").on("child_added",snapshot=>{
      this.setState({
        data:this.state.data.concat(snapshot.val()),
        loading:false
      })
    })
  }
  componentDidMount() {
    this.getPost();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Loading />}
        <br />
        <br />
        <br />
        <br />
        {this.state.data
          .map((item, i) => {
            return (
              <Post
                key={i}
                txt={item.txt}
                nombre={item.nombre}
                avatar={item.avatar}
                pic={item.pic}
              />
            );
          })
          .reverse()}
      </React.Fragment>
    );
  }
}

export default FeedContent;
