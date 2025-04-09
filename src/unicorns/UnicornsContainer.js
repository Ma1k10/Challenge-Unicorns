import React, { useEffect, useState } from "react";
import UnicornsView from "./UnicornsView";
import axios from "axios";

// Reemplazá esta URL con tu endpoint real de crudcrud.com
const API_URL = "https://crudcrud.com/api/e6ce07a1448549978cb84348a960e3d2";

const UnicornsContainer = () => {
  const [unicorns, setUnicorns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    age: "",
    power: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Obtener unicornios al cargar
  useEffect(() => {
    getUnicorns();
  }, []);

  const getUnicorns = async () => {
    try {
      const res = await axios.get(API_URL);
      setUnicorns(res.data);
    } catch (error) {
      console.error("Error al obtener unicornios", error);
    }
  };

  const onCreate = async () => {
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: "", color: "", age: "", power: "" });
      getUnicorns();
    } catch (error) {
      console.error("Error al crear unicornio", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getUnicorns();
    } catch (error) {
      console.error("Error al eliminar unicornio", error);
    }
  };

  const onEdit = (unic) => {
    setFormData({
      name: unic.name,
      color: unic.color,
      age: unic.age,
      power: unic.power
    });
    setEditingId(unic._id);
    setIsEditing(true);
  };

  const onUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, formData);
      setFormData({ name: "", color: "", age: "", power: "" });
      setIsEditing(false);
      setEditingId(null);
      getUnicorns();
    } catch (error) {
      console.error("Error al actualizar unicornio", error);
    }
  };

  return (
    <UnicornsView
      unicorns={unicorns}
      formData={formData}
      setFormData={setFormData}
      onCreate={onCreate}
      onDelete={onDelete}
      onEdit={onEdit}
      onUpdate={onUpdate}
      isEditing={isEditing}
    />
  );
};

export default UnicornsContainer;
