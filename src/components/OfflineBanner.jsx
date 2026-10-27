import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import { cloudOfflineOutline } from 'ionicons/icons';

// Aviso que se muestra cuando no hay internet
export const OfflineBanner = ({ isOnline }) => {
  if (isOnline) return null;
  return (
    <IonItem color="warning" lines="none">
      <IonIcon icon={cloudOfflineOutline} slot="start" />
      <IonLabel className="ion-text-wrap">
        Sin conexión: las acciones están deshabilitadas hasta que vuelva el internet.
      </IonLabel>
    </IonItem>
  );
};
