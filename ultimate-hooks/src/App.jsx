import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    return response.data;
  };

  const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
  };

  const lisaa = (resource) => {
    setResources(resource);
    return resource;
  };

  const service = {
    create,
    getAll,
    lisaa,
  };

  return [resources, service];
};

const baseUrlNotes = "http://localhost:3005/notes";
const baseUrlPersons = "http://localhost:3005/persons";

const App = () => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetNumber, ...number } = useField("text");

  const [notes, noteService] = useResource(baseUrlNotes);
  const [persons, personService] = useResource(baseUrlPersons);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      noteService.lisaa(initialNotes);
    });
  }, [noteService]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      personService.lisaa(initialPersons);
    });
  }, [personService]);

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });

    resetContent();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });

    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
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
