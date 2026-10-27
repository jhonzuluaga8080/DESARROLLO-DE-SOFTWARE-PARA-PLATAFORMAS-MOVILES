import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

// Si el dispositivo no tiene vibrador, las llamadas no hacen nada (no se rompe la app)
export const useHaptics = () => {
  const run = async (fn) => {
    try {
      await fn();
    } catch (e) {
      console.log('Haptics no disponible', e);
    }
  };

  const impact = (style = 'medium') =>
    run(() =>
      Haptics.impact({
        style: { light: ImpactStyle.Light, medium: ImpactStyle.Medium, heavy: ImpactStyle.Heavy }[style] || ImpactStyle.Medium,
      })
    );

  const notify = (type = 'success') =>
    run(() =>
      Haptics.notification({
        type: { success: NotificationType.Success, warning: NotificationType.Warning, error: NotificationType.Error }[type] || NotificationType.Success,
      })
    );

  const vibrate = (duration = 100) => run(() => Haptics.vibrate({ duration }));
  const selectionStart = () => run(() => Haptics.selectionStart());
  const selectionChanged = () => run(() => Haptics.selectionChanged());
  const selectionEnd = () => run(() => Haptics.selectionEnd());

  return { impact, notify, vibrate, selectionStart, selectionChanged, selectionEnd };
};
