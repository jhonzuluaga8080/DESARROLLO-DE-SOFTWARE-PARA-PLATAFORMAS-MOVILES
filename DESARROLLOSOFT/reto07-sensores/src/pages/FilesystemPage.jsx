import { useState } from 'react';
import { IonButton, IonInput, IonItem, IonSpinner } from '@ionic/react';
import { SensorPage, ErrorText } from '../components/SensorPage';
import { useFilesystem } from '../hooks/useFilesystem';

const FilesystemPage = () => {
  const { loading, error, writeFile, readFile, deleteFile, listFiles, createDir, deleteDir } = useFilesystem();
  const [archivo, setArchivo] = useState('mi-data.json');
  const [texto, setTexto] = useState('Hola desde Ionic');
  const [salida, setSalida] = useState('');

  const onWrite = async () => {
    const ok = await writeFile({ path: archivo, data: { texto, fecha: new Date().toISOString() } });
    if (ok) setSalida(`✔ Archivo "${archivo}" guardado`);
  };

  const onRead = async () => {
    const data = await readFile({ path: archivo });
    if (data) setSalida(JSON.stringify(data, null, 2));
  };

  const onList = async () => {
    const files = await listFiles();
    setSalida(files.length ? files.join('\n') : '(carpeta vacía)');
  };

  const onDelete = async () => {
    const ok = await deleteFile({ path: archivo });
    if (ok) setSalida(`🗑 Archivo "${archivo}" eliminado`);
  };

  const onCreateDir = async () => {
    const ok = await createDir({ path: 'mis-datos' });
    if (ok) setSalida('✔ Carpeta "mis-datos" creada');
  };

  const onDeleteDir = async () => {
    const ok = await deleteDir({ path: 'mis-datos' });
    if (ok) setSalida('🗑 Carpeta "mis-datos" eliminada');
  };

  return (
    <SensorPage title="Filesystem">
      <IonItem>
        <IonInput label="Nombre del archivo" labelPlacement="floating" value={archivo}
          onIonInput={(e) => setArchivo(e.detail.value ?? '')} />
      </IonItem>
      <IonItem>
        <IonInput label="Contenido" labelPlacement="floating" value={texto}
          onIonInput={(e) => setTexto(e.detail.value ?? '')} />
      </IonItem>

      <IonButton expand="block" className="ion-margin-top" onClick={onWrite}>Escribir archivo</IonButton>
      <IonButton expand="block" onClick={onRead}>Leer archivo</IonButton>
      <IonButton expand="block" onClick={onList}>Listar archivos</IonButton>
      <IonButton expand="block" color="danger" onClick={onDelete}>Eliminar archivo</IonButton>
      <IonButton expand="block" fill="outline" onClick={onCreateDir}>Crear carpeta "mis-datos"</IonButton>
      <IonButton expand="block" fill="outline" color="danger" onClick={onDeleteDir}>Eliminar carpeta "mis-datos"</IonButton>

      {loading && <IonSpinner name="crescent" />}
      <ErrorText error={error} />
      {salida && <pre style={{ whiteSpace: 'pre-wrap' }}>{salida}</pre>}
    </SensorPage>
  );
};

export default FilesystemPage;
