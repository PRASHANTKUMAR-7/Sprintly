import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api, { setTokens } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { notifyError } from '../utils/toast';
import Spinner from '../components/Spinner';

export default function OAuthSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateUser } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken) {
      notifyError('Google sign-in failed. Please try again.');
      navigate('/login', { replace: true });
      return;
    }

    setTokens({ accessToken, refreshToken });
    api
      .get('/auth/me')
      .then((res) => {
        updateUser(res.data.data.user);
        navigate('/', { replace: true });
      })
      .catch(() => {
        notifyError('Google sign-in failed. Please try again.');
        navigate('/login', { replace: true });
      });
  }, [searchParams, navigate, updateUser]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={32} />
        <p style={{ color: 'var(--muted)', marginTop: 12 }}>Completing sign-in…</p>
      </div>
    </div>
  );
}