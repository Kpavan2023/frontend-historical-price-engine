import { useState } from 'react';

export function useTokenForm(onSubmitCallback) {
  const [form, setForm] = useState({
    token: '',
    network: 'ethereum',
    timestamp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.token || !form.timestamp) {
      alert('Please enter both token and timestamp.');
      return;
    }

    onSubmitCallback(form);
  };

  return {
    form,
    handleChange,
    handleSubmit,
    resetForm: () =>
      setForm({ token: '', network: 'ethereum', timestamp: '' }),
  };
}
    