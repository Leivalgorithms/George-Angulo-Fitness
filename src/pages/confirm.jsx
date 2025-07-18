// src/pages/confirm.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ConfirmPage() {
  const location = useLocation();
  // Eliminar esta línea ya que no se usa
  // const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('confirmation_token');
    
    if (token) {
      window.location.href = '/admin/#/confirm';
    }
  }, [location]);

  return (
    <div>
      <h2>Confirmando tu cuenta...</h2>
      <p>Por favor espera mientras procesamos tu invitación.</p>
    </div>
  );
}