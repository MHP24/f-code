import toast from 'react-hot-toast';

export const toaster = (content: string, status: boolean) => {
  if(status) {
    toast.success(content, {
      style: {
        backgroundColor: 'var(--c2-hover)',
        border: 'var(--c3) 1px solid',
        fontSize: 'var(--fs-1)',
        boxShadow: 'var(--b-sh-2-low)',
        color: 'var(--c3)'
      },
    });
    return;
  }

  toast.error(content, {
    style: {
      backgroundColor: 'var(--c2-hover)',
      border: 'var(--c3) 1px solid',
      fontSize: 'var(--fs-1)',
      boxShadow: 'var(--b-sh-3-low)',
      color: 'var(--c3)'
    },
  });
}