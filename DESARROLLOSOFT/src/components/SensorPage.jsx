import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonText } from '@ionic/react';

// Estructura común de las páginas de sensores (título + botón volver)
export const SensorPage = ({ title, children }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">{children}</IonContent>
  </IonPage>
);

export const ErrorText = ({ error }) =>
  error ? (
    <IonText color="danger">
      <p>{error}</p>
    </IonText>
  ) : null;
