import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  // axios
  //   .get("/user/getuser")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const getNotes = async (token) => {
    const res = await axios.get("note/api/", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };
  const deleteNote = async (id) => {
    const a = window.confirm("Do you want delete this note");
    if (a) {
      try {
        if (token) {
          await axios.delete(`note/api/${id}`, {
            headers: { Authorization: token },
          });
          getNotes(token);
        }
      } catch (error) {
        console.log("eorrr");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);
  return (
    <div className="note-wrapper">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <h4 title={note.title}>{note.title}</h4>
          <div className="text-wrapper">
            <p>{note.content}</p>
          </div>
          <p className="date">{format(note.date)}</p>
          <div className="card-footer">
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
          </div>
          <button className="close" onClick={() => deleteNote(note._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
