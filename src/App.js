import { useState } from "react";

import "./App.css";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [toDoItem, setToDoItem] = useState("");
  const [editToDoId, setEditTodoId] = useState(0);
  const [btnName, setBtnName] = useState("ADD TO LIST");

  function setToDo() {
    if (toDoItem.trim() !== "") {
      if (
        editToDoId &&
        !toDoList.find(
          (to) => to.task.toLowerCase().trim() === toDoItem.toLowerCase().trim()
        )
      ) {
        setToDoList(
          toDoList.map((obj) =>
            obj.id === editToDoId ? { id: obj.id, task: toDoItem.trim() } : obj
          )
        );
        setEditTodoId(0);
        setToDoItem("");
        setBtnName("ADD TO LIST");
      } else {
        if (
          toDoItem.length !== 0 &&
          !toDoList.find(
            (to) =>
              to.task.toLowerCase().trim() === toDoItem.toLowerCase().trim()
          )
        ) {
          setToDoList([
            ...toDoList,
            { id: Date.now(), task: toDoItem.trim(), status: false },
          ]);
        }
        setToDoItem("");
      }
    }
  }

  return (
    <div className="App">
      <h2 className="heading">- TODO LIST -</h2>
      <div className="top-bar">
        <input
          type="text"
          className="input-box"
          value={toDoItem}
          placeholder="eg : cook food"
          onChange={(e) => {
            setToDoItem(e.target.value);
          }}
        />
        <button className="add-btn" onClick={setToDo}>
          {btnName}
        </button>
      </div>
      <div className="todo-list">
        {toDoList.map((item) => {
          return (
            <div key={item.id} className="list-item">
              <span className="task-name">
                <i className="fa-solid fa-arrow-right i-size"></i> {item.task}
              </span>
              <div className="update-icons">
                <span>
                  <i
                    className="fa-regular fa-pen-to-square u-size"
                    onClick={() => {
                      const editItemId = toDoList.find(
                        (to) => to.id === item.id
                      );
                      setToDoItem(editItemId.task);
                      setEditTodoId(editItemId.id);
                      setBtnName("UPDATE");
                    }}
                  ></i>
                </span>
                <span>
                  <i
                    className="fa-solid fa-xmark ux-size"
                    onClick={() => {
                      setToDoList(
                        toDoList.filter((obj) => {
                          if (obj.id !== item.id) {
                            return obj;
                          }
                          return null;
                        })
                      );
                    }}
                  ></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
