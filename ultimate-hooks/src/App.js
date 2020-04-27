import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getall = async () => {
    const result = await axios.get(baseUrl);
    setResources(result.data);
  };
  useEffect(() => {
    getall();
  }, []);

  const create = async (resource) => {
    console.log(resource);
    const result = await axios.post(baseUrl, resource);
    setResources([...resources, result.data]);
    return result.data;
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div className='container'>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <div className='form-group'>
          {' '}
          <input {...content} />
        </div>
        <button className='btn btn-primary'>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div className='form-group'>
          name
          <input {...name} />
        </div>
        <br />
        number
        <div className='form=group'>
          <input {...number} />
        </div>
        <button className='btn btn-primary'>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
