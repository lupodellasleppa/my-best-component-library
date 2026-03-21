import { ref } from 'vue';

export interface Toast {
  id: string;
  message: string;
  duration: number;
}

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

const toasts = ref<Toast[]>([]);
// Set a default position
const currentPosition = ref<ToastPosition>('bottom-right');

export function useToast() {
  const show = (message: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts.value.push({ id, message, duration });
    setTimeout(() => remove(id), duration);
  };

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  // Allow the host app to change the position globally
  const setPosition = (pos: ToastPosition) => {
    currentPosition.value = pos;
  };

  return { toasts, currentPosition, show, remove, setPosition };
}
