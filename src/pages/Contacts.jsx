import { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel,
  IonSpinner, IonText,
} from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import useCollection from '../hooks/useCollection';
import useNetwork from '../hooks/useNetwork';
import { OfflineBanner } from '../components/OfflineBanner';

// CONTACTOS → Firestore (requiere internet)
const Contacts = () => {
  const { user } = useAuth();
  const { isOnline } = useNetwork();
  const { results, isPending, error, getAll, add, update, remove } = useCollection('contacts');

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editId, setEditId] = useState(null);

  const cargar = () => {
    if (user?.uid) getAll([['userId', '==', user.uid]]);
  };

  // Carga al entrar y cada vez que vuelve el internet
  useEffect(() => {
    if (isOnline && user?.uid) cargar();
  }, [isOnline, user?.uid]);

  const limpiar = () => {
    setNombre('');
    setTelefono('');
    setEditId(null);
  };

  const handleGuardar = async () => {
    if (!nombre.trim()) return;
    const data = { nombre: nombre.trim(), telefono: telefono.trim() };
    if (editId) await update(editId, data);
    else await add({ ...data, userId: user.uid });
    limpiar();
    await cargar();
  };

  const handleEditar = (c) => {
    setEditId(c.id);
    setNombre(c.nombre);
    setTelefono(c.telefono || '');
  };

  const handleEliminar = async (id) => {
    await remove(id);
    await cargar();
  };

  const ordenados = [...results].sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <OfflineBanner isOnline={isOnline} />

        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="floating"
            value={nombre}
            disabled={!isOnline}
            onIonInput={(e) => setNombre(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Teléfono"
            labelPlacement="floating"
            type="tel"
            value={telefono}
            disabled={!isOnline}
            onIonInput={(e) => setTelefono(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" disabled={!isOnline || isPending} onClick={handleGuardar}>
          {isPending ? <IonSpinner name="crescent" /> : editId ? 'Guardar cambios' : 'Agregar contacto'}
        </IonButton>
        {editId && (
          <IonButton expand="block" fill="outline" onClick={limpiar}>
            Cancelar edición
          </IonButton>
        )}

        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonList>
          {ordenados.map((c) => (
            <IonItem key={c.id}>
              <IonLabel>
                <h2>{c.nombre}</h2>
                <p>{c.telefono}</p>
              </IonLabel>
              <IonButton fill="clear" disabled={!isOnline} onClick={() => handleEditar(c)}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton fill="clear" color="danger" disabled={!isOnline} onClick={() => handleEliminar(c.id)}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
