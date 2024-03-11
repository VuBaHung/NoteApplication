import React from "react";
import Nav from "./notes/Nav";
import Home from "./notes/Home";
import CreateNote from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function Notes({ setIsLogin }) {
  return (
    <div className="notes-page">
      <BrowserRouter>
        <Nav setIsLogin={setIsLogin} />
        <section>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<CreateNote />}></Route>
            <Route path="/edit/:id" element={<EditNote />}></Route>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default Notes;
