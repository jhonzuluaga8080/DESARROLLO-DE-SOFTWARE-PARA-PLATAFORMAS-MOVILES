import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel,
  IonSearchbar, IonText,
} from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import useDexie from '../hooks/useDexie';

// FRUTAS → Dexie (local). Funciona con o sin internet, por eso no se deshabilita nada.
const Fruits = () => {
  const { results, error, search, searchByName, add, update, deleteItem } = useDexie('frutas');

  const [nombre, setNombre] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [fechaCosecha, setFechaCosecha] = useState('');
  const [editId, setEditId] = useState(null);

  const limpiar = () => {
    setNombre('');
    setProveedor('');
    setFechaCosecha('');
    setEditId(null);
  };

  const handleGuardar = async () => {
    if (!nombre.trim()) return;
    const data = { nombre: nombre.trim(), proveedor: proveedor.trim(), fechaCosecha };
    if (editId) await update(editId, data);
    else await add(data);
    limpiar();
  };

  const handleEditar = (f) => {
    setEditId(f.id);
    setNombre(f.nombre);
    setProveedor(f.proveedor || '');
    setFechaCosecha(f.fechaCosecha || '');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Frutas (Dexie)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color="medium"><p>Datos locales: funcionan sin internet.</p></IonText>

        <IonItem>
          <IonInput label="Nombre" labelPlacement="floating" value={nombre}
            onIonInput={(e) => setNombre(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonInput label="Proveedor" labelPlacement="floating" value={proveedor}
            onIonInput={(e) => setProveedor(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonInput label="Fecha de cosecha" labelPlacement="stacked" type="date" value={fechaCosecha}
            onIonInput={(e) => setFechaCosecha(e.detail.value ?? '')} />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={handleGuardar}>
          {editId ? 'Guardar cambios' : 'Agregar fruta'}
        </IonButton>
        {editId && (
          <IonButton expand="block" fill="outline" onClick={limpiar}>
            Cancelar edición
          </IonButton>
        )}

        {error && <IonText color="danger"><p>{error}</p></IonText>}

        {/* newFunction: búsqueda por nombre */}
        <IonSearchbar
          placeholder="Buscar fruta por nombre"
          value={search}
          onIonInput={(e) => searchByName(e.detail.value ?? '')}
        />

        <IonList>
          {results.map((f) => (
            <IonItem key={f.id}>
              <IonLabel>
                <h2>{f.nombre}</h2>
                <p>{f.proveedor || 'Sin proveedor'} · {f.fechaCosecha || 'Sin fecha'}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => handleEditar(f)}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton fill="clear" color="danger" onClick={() => deleteItem(f.id)}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Fruits;
