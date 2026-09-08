import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordInput({ label, name, value, onChange, placeholder, required }) {
  const [show, setShow] = useState(false);

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          style={{ paddingRight: 36 }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
          }}
          tabIndex={-1}
        >
          {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
        </button>
      </div>
    </div>
  );
}
