import { Notify } from 'quasar';

type ToastType = 'positive' | 'negative' | 'warning' | 'info';

export function toast(message: string, type: ToastType = 'info') {
  Notify.create({
    type,
    message,
    position: 'top-right',
    timeout: 1400,
    progress: true,
  });
}
