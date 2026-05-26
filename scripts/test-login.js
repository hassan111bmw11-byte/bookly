import fetch from 'node-fetch';

const url = 'http://localhost:3000/api/auth/login';
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'login-test@example.com', password: 'Password123!' }),
});
const body = await response.text();
console.log('status', response.status);
console.log('headers', Object.fromEntries(response.headers.entries()));
console.log('body', body);
