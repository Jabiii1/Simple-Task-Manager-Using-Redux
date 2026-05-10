import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./app/store";
import { addTask, deleteTask } from "./features/taskSlice";

const TaskManager = () => {
  const [inputValue, setInputValue] = useState("");
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    dispatch(addTask(inputValue.trim()));
    setInputValue("");
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px 20px",
            borderRadius: "20px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h1 style={{ color: "#2c3e50", fontSize: "32px", margin: "0 0 25px 0", textAlign: "center" }}>
            📝 Simple Task Manager
          </h1>

          <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 15px",
                borderRadius: "10px",
                border: "2px solid #e1e5ee",
                fontSize: "16px",
                outline: "none",
                width: "100%",
              }}
            />
            <button
              onClick={handleAddTask}
              style={{
                padding: "12px 20px",
                backgroundColor: "#1e3a8a",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0 4px 6px rgba(30, 58, 138, 0.3)",
              }}
            >
              Add
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {tasks.length === 0 ? (
              <p style={{ textAlign: "center", color: "#888", fontSize: "16px" }}>
                No tasks yet.
              </p>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 15px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    borderLeft: "5px solid #1e3a8a",
                    fontSize: "18px",
                    color: "#333",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <span style={{ wordBreak: "break-word", paddingRight: "10px" }}>{task}</span>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  );
}
