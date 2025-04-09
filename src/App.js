import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                  
import 'primeicons/primeicons.css';               

const API_URL = "https://crudcrud.com/api/e6ce07a1448549978cb84348a960e3d2/objetos";

const ObjectManager = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState(null);
  const [power, setPower] = useState("");
  const [response, setResponse] = useState(null);

  const [editname, setEditname] = useState("");
  const [editcolor, setEditcolor] = useState("");
  const [editage, setEditage] = useState(null);
  const [editpower, setEditpower] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    const objectData = {
      name,
      color,
      age,
      power,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objectData),
      });

      const result = await res.json();
      setResponse(result);
      localStorage.setItem("objectId", result._id);  // Importante: es _id en CrudCrud
      console.log("Objeto creado:", result);
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleUpdate = async () => {
    const id = localStorage.getItem("objectId");
    if (!id) {
      alert("No hay ID guardado para actualizar.");
      return;
    }

    const updatedData = {
      name: editname || name,
      color: editcolor || color,
      age: editage !== null ? editage : age,
      power: editpower || power,
    };

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert("Objeto actualizado correctamente.");
        setResponse(updatedData);
      } else {
        console.error("Error al actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleDelete = async () => {
    const id = localStorage.getItem("objectId");
    if (!id) {
      alert("No hay ID guardado para eliminar.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Objeto eliminado correctamente.");
        localStorage.removeItem("objectId");
        setResponse(null);
      } else {
        console.error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Crear Unicornio</h2>
      <form onSubmit={handleCreate}>
        <span className="p-float-label">
          <InputText id="nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="nombre">Nombre</label>
        </span><br /><br />

        <span className="p-float-label">
          <InputText id="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <label htmlFor="color">Color</label>
        </span><br /><br />

        <span className="p-float-label">
          <InputNumber id="edad" value={age} onValueChange={(e) => setAge(e.value)} />
          <label htmlFor="edad">Edad</label>
        </span><br /><br />

        <span className="p-float-label">
          <InputText id="poder" value={power} onChange={(e) => setPower(e.target.value)} />
          <label htmlFor="poder">Poder</label>
        </span><br /><br />

        <Button label="Crear" icon="pi pi-plus" type="submit" />
      </form>

      <h2 style={{ marginTop: "2rem" }}>Editar Unicornio</h2>
      <InputText placeholder="Nuevo Nombre" value={editname} onChange={(e) => setEditname(e.target.value)} /><br /><br />
      <InputText placeholder="Nuevo Color" value={editcolor} onChange={(e) => setEditcolor(e.target.value)} /><br /><br />
      <InputNumber placeholder="Nueva Edad" value={editage} onValueChange={(e) => setEditage(e.value)} /><br /><br />
      <InputText placeholder="Nuevo Poder" value={editpower} onChange={(e) => setEditpower(e.target.value)} /><br /><br />

      <Button label="Actualizar" icon="pi pi-refresh" onClick={handleUpdate} severity="info" />

      <h2 style={{ marginTop: "2rem" }}>Eliminar Unicornio</h2>
      <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={handleDelete} />

      <h3 style={{ marginTop: "2rem" }}>Respuesta:</h3>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ObjectManager;
