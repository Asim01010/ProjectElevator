# Backend Test Examples

Use these commands to quickly verify the backend.

Health check (no auth):

```bash
curl -i http://localhost:5000/health
```

Check protected projects endpoint (no token — should return 401):

```bash
curl -i http://localhost:5000/api/projects
```

Register (may require valid EMAIL_* env variables):

```bash
curl -i -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"secret123","confirmPassword":"secret123"}'
```

Login (returns token):

```bash
curl -i -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"secret123"}'
```

Get profile (use token from login):

```bash
curl -i -H "Authorization: Bearer <TOKEN>" http://localhost:5000/api/users/profile
```

Create project (use token):

```bash
curl -i -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name":"My Elevator","description":"Test project","layerMaterials":[1,2,3],"subMaterials":{"ceiling":1},"selectedView":"straight"}'
```

Postman: import a new collection and create requests matching the above endpoints. Add an `ENV` with `baseUrl=http://localhost:5000` and use `{{baseUrl}}/api/users/login` etc.
