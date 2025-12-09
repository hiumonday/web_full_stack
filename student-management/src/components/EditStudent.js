import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api/students';

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert('Không thể tải thông tin học sinh');
        navigate('/');
      });
  }, [id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${API_URL}/${id}`, {
      name,
      age: Number(age),
      class: stuClass
    })
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        alert('Cập nhật thành công!');
        navigate('/');
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        alert('Có lỗi xảy ra khi cập nhật');
      });
  };

  if (loading) {
    return <div className="edit-container">Đang tải...</div>;
  }

  return (
    <div className="edit-container">
      <h2>Chỉnh Sửa Thông Tin Học Sinh</h2>
      <form className="edit-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Họ tên:</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tuổi:</label>
          <input
            type="number"
            className="form-input"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Lớp:</label>
          <input
            type="text"
            className="form-input"
            value={stuClass}
            onChange={e => setStuClass(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => navigate('/')}>
            Hủy
          </button>
          <button type="submit" className="update-button">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
