import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Form.css';

const Form = () => {
  const tagList = ['React', 'JavaScript', 'Node.js',   'Fitness', 'Travel', 'Wellness','Investing', 'Cryptocurrency', 'Personal Finance' ];
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
    category: '',
    tags: [],
    published: false
  });

  const [articles, setArticles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [background, setBackground] = useState('white');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'published') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked
        }));
      } else {
        const newTags = checked
          ? [...formData.tags, value]
          : formData.tags.filter((tag) => tag !== value);
        setFormData((prevData) => ({
          ...prevData,
          tags: newTags
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim().length === 0) {
      return;
    }
    if (editIndex !== null) {
      setArticles((curr) =>
        curr.map((article, index) => (index === editIndex ? formData : article))
      );
      setEditIndex(null);
    } else {
      setArticles((curr) => [...curr, formData]);
    }
    setFormData({
      title: '',
      image: '',
      content: '',
      category: '',
      tags: [],
      published: false
    });
  };

  const deleteArticle = (index) => {
    setArticles((curr) => curr.filter((_, i) => i !== index));
  };

  const editArticle = (index) => {
    setFormData(articles[index]);
    setEditIndex(index);
  };

  useEffect(() => {
    if (formData.published) {
      alert('Articolo pubblicato!');
    }
  }, [formData.published]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackground((prev) => (prev === 'white' ? 'black' : 'white'));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: background, color: background === 'white' ? 'black' : 'white', minHeight: '50%', transition: 'background-color 0.5s ease' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Titolo del blog"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            placeholder="URL dell'immagine"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            placeholder="Contenuto del blog"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleziona una categoria</option>
            <option value="technology">Tecnologia</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="finance">Finanza</option>
          </select>
        </div>
        <div className="form-group checkbox-group">
          <p>Tags:</p>
          {tagList.map((tag, index) => (
            <label key={`tag${index}`}>
              <input
                type="checkbox"
                name="tags"
                value={tag}
                checked={formData.tags.includes(tag)}
                onChange={handleChange}
              />
              {tag}
            </label>
          ))}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            Pubblicato
          </label>
        </div>
        <button disabled={formData.title.trim().length === 0}>Salva</button>
      </form>
      <ul>
        {articles.map((article, index) => (
          <li key={`article${index}`}>
            <div className="card">
              <h3>{article.title}</h3>
              {article.image && <img src={article.image} alt={article.title} />}
              <p>{article.content}</p>
              <p>Categoria: {article.category}</p>
              <div className="tags">
                {article.tags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
              <p>{article.published ? 'Pubblicato' : 'Non Pubblicato'}</p>
            </div>
            <div>
              <button onClick={() => editArticle(index)}>
                <FaEdit />
              </button>
              <button onClick={() => deleteArticle(index)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
