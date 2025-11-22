import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLogOut, FiUser, FiPlus } from "react-icons/fi";

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  // Load tasks on start
  useEffect(() => {
    loadTasks();
  }, []);

  // Search Filter
  useEffect(() => {
    const s = search.toLowerCase();

    if (!Array.isArray(tasks)) {
      setFilteredTasks([]);
      return;
    }

    const results = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(s) ||
        t.description.toLowerCase().includes(s) ||
        t.status.toLowerCase().includes(s)
    );

    setFilteredTasks(results);
  }, [search, tasks]);

  async function loadTasks() {
    const token = localStorage.getItem("token");

    if (!token) {
      onLogout();
      return;
    }

    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // If token expired or invalid
    if (res.status === 401) {
      localStorage.removeItem("token");
      onLogout();
      return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      setTasks(data);
      setFilteredTasks(data);
    } else {
      setTasks([]);
      setFilteredTasks([]);
    }
  }

  // Create task
  async function createTask() {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: taskTitle,
        description: taskDesc,
        status: taskStatus,
      }),
    });

    setShowModal(false);
    setTaskTitle("");
    setTaskDesc("");
    setTaskStatus("pending");
    loadTasks();
  }

  // Delete task
  async function deleteTask(id) {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadTasks();
  }

  // Mark Completed
  async function markCompleted(id) {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "completed" }),
    });

    loadTasks();
  }

  // Open Edit Modal
  function openEditModal(task) {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditStatus(task.status);
    setShowEditModal(true);
  }

  // Save Edited Task
  async function updateTask() {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/tasks/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDesc,
        status: editStatus,
      }),
    });

    setShowEditModal(false);
    loadTasks();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
              <FiUser className="text-white" size={26} />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                Welcome Back
              </h1>
              <p className="text-sm text-slate-500">Your Task Dashboard</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-lg text-sm text-red-600 hover:shadow-md transition"
          >
            <FiLogOut /> Logout
          </button>
        </header>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full p-3 border rounded-lg mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Your Tasks</h2>

              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg shadow"
              >
                <FiPlus /> New Task
              </button>
            </div>

            {/* TASK LIST */}
            <div className="space-y-3">
              {Array.isArray(filteredTasks) &&
                filteredTasks.map((t) => (
                  <motion.div
                    key={t._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition bg-white relative ${
                      t.status === "completed" ? "bg-green-50 border-green-300" : ""
                    }`}
                  >
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => openEditModal(t)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ✎
                      </button>

                      <button
                        onClick={() => deleteTask(t._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>

                    <h3 className="font-semibold text-slate-800">{t.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{t.description}</p>

                    <p className="mt-2 text-xs font-medium">
                      Status:{" "}
                      <span
                        className={`px-2 py-1 rounded ${
                          t.status === "completed"
                            ? "bg-green-200 text-green-700"
                            : "bg-yellow-200 text-yellow-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </p>

                    {t.status !== "completed" && (
                      <button
                        onClick={() => markCompleted(t._id)}
                        className="mt-3 text-sm px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Mark Completed
                      </button>
                    )}
                  </motion.div>
                ))}
            </div>
          </section>

          {/* RIGHT SIDE */}
          <aside className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                U
              </div>

              <div>
                <p className="font-semibold text-slate-800">User</p>
                <p className="text-sm text-slate-500">user@example.com</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition">
                Edit Profile
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 transition">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                Activity Log
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* CREATE TASK MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Task</h2>

            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            ></textarea>

            <select
              className="w-full border p-2 rounded mb-3"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={createTask}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TASK MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <input
              className="w-full border p-2 rounded mb-3"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-2 rounded mb-3"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            ></textarea>

            <select
              className="w-full border p-2 rounded mb-3"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
