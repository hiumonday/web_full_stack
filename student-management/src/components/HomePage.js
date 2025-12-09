import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/api/students';

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(API_URL)
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  };

  // Add student
  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStu = { name, age: Number(age), class: stuClass };
    axios.post(API_URL, newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        setStudents(prev => [...prev, res.data]);
        // Clear form
        setName('');
        setAge('');
        setStuClass('');
      })
      .catch(err => console.error("Lỗi khi thêm:", err));
  };

  // Delete student
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;
    axios.delete(`${API_URL}/${id}`)
      .then(res => {
        console.log(res.data.message);
        setStudents(prevList => prevList.filter(s => s._id !== id));
      })
      .catch(err => console.error("Lỗi khi xóa:", err));
  };

  // Filter students by search term
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort students by name
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a.name < b.name) return sortAsc ? -1 : 1;
    if (a.name > b.name) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <h1>Quản Lý Học Sinh</h1>

      {/* Add Student Form */}
      <div className="add-form">
        <h2>Thêm Học Sinh Mới</h2>
        <form onSubmit={handleAddStudent}>
          <div className="form-row">
            <input
              type="text"
              className="form-input"
              placeholder="Họ tên"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="number"
              className="form-input"
              placeholder="Tuổi"
              value={age}
              onChange={e => setAge(e.target.value)}
              required
              min="1"
            />
            <input
              type="text"
              className="form-input"
              placeholder="Lớp"
              value={stuClass}
              onChange={e => setStuClass(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Thêm học sinh</button>
        </form>
      </div>

      {/* Search and Sort Controls */}
      <div className="search-sort-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="sort-button" onClick={() => setSortAsc(prev => !prev)}>
          Sắp xếp theo tên: {sortAsc ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      {/* Students Table */}
      <h2>Danh Sách Học Sinh</h2>
      {sortedStudents.length === 0 ? (
        <div className="no-data">
          {searchTerm ? 'Không tìm thấy học sinh nào' : 'Chưa có học sinh nào'}
        </div>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Họ Tên</th>
              <th>Tuổi</th>
              <th>Lớp</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/edit/${student._id}`)}
                    >
                      Sửa
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(student._id)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HomePage;
