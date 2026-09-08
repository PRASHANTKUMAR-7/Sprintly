import toast from 'react-hot-toast';

export function notifyError(message) {
  if (!message) return;
  toast.error(message, { duration: 4000 });
}

export function notifySuccess(message) {
  if (!message) return;
  toast.success(message, { duration: 4000 });
}