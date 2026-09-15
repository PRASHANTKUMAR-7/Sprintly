import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/helpers';
import { notifyError } from '../utils/toast';
import PasswordInput from '../components/PasswordInput';
import { GOOGLE_AUTH_URL } from '../api/oauth';

const PASSWORD_RULE_MESSAGE =
  'Password must be at least 8 characters and contain letters, numbers, and a special character';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(form.password)) {
      notifyError(PASSWORD_RULE_MESSAGE);
      return;
    }
    if (form.password !== form.confirmPassword) {
      notifyError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await signup({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      });
      navigate('/');
    } catch (err) {
      notifyError(getErrorMessage(err, 'Signup failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="card" style={{ width: 420 }}>
        <h2 style={{ marginBottom: 4 }}>Create account</h2>
        <p style={{ color: 'var(--muted)', marginTop: 0, marginBottom: 20 }}>Start managing your projects</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@example.com" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>First name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={onChange} placeholder="Jane" />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={onChange} placeholder="Doe" />
            </div>
          </div>
          <div className="form-group">
            <label>Phone (optional)</label>
            <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+1 555 000 0000" />
          </div>
          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            placeholder="At least 8 characters"
          />
          <PasswordInput
            label="Confirm password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            required
            placeholder="Re-enter password"
          />
          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>OR</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <a
          href={GOOGLE_AUTH_URL}
          className="btn btn-block"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.4 32.2 29 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C34.1 6.4 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C34.1 6.4 29.3 4 24 4 16.2 4 9.5 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5 0-9.3-3.1-11.2-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/>
          </svg>
          Continue with Google
        </a>
        <p style={{ marginTop: 16, textAlign: 'center', color: 'var(--muted)' }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
