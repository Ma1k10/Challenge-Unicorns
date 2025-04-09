// src/unicorns/UnicornsView.jsx
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const UnicornsView = ({
  unicorns,
  formData,
  setFormData,
  onCreate,
  onDelete,
  onEdit,
  onUpdate,
  isEditing
}) => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Gestión de Unicornios 🦄</h2>

      <div className="p-fluid p-formgrid p-grid" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <InputText placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <InputText placeholder="Color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
        <InputText placeholder="Edad" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <InputText placeholder="Poder" value={formData.power} onChange={(e) => setFormData({ ...formData, power: e.target.value })} />

        {isEditing ? (
          <Button label="Guardar Cambios" icon="pi pi-save" onClick={onUpdate} className="p-button-success" />
        ) : (
          <Button label="Agregar" icon="pi pi-plus" onClick={onCreate} />
        )}
      </div>

      <DataTable value={unicorns} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Nombre"></Column>
        <Column field="color" header="Color"></Column>
        <Column field="age" header="Edad"></Column>
        <Column field="power" header="Poder"></Column>
        <Column
          header="Acciones"
          body={(rowData) => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => onEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-danger" onClick={() => onDelete(rowData._id)} />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

export default UnicornsView;
