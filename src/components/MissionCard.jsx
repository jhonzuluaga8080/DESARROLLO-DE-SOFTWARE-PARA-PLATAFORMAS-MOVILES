import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge } from '@ionic/react';

const colores = { completada: 'success', pendiente: 'warning', bloqueada: 'medium' };

export const MissionCard = ({ titulo, descripcion, puntos, estado, children }) => (
  <IonCard>
    <IonCardHeader>
      <IonBadge color={colores[estado]}>{estado}</IonBadge>
      <IonCardTitle>{titulo}</IonCardTitle>
      <IonCardSubtitle>{puntos} puntos</IonCardSubtitle>
    </IonCardHeader>
    <IonCardContent>
      <p>{descripcion}</p>
      {children}
    </IonCardContent>
  </IonCard>
);
