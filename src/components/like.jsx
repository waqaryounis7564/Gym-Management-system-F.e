import React, { Component } from "react";
import { FaHeart } from "react-icons/fa";

class Like extends Component {
  state = { active: true };
  toggleLike(id) {
    console.log(id);
  }
  render() {
    return <FaHeart></FaHeart>;
  }
}
export default Like;
