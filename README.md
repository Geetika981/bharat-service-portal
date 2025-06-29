
# 🛠️ ProFinder – Local Services Booking Platform

**ProFinder** is a scalable MERN-based web application that connects users with local service providers across various domains. The platform supports role-based access (Admin, Provider, User), seamless service management, and integrated payment features with a mobile-first responsive design.

---

## 🔗 Live Demo

🚀 [Visit ProFinder Now](https://your-live-site-link.com)

---

## 📌 Features

### 👤 **User Module**
- Register/Login using secure cookies
- Browse services by pincode and category
- Book services
- View booking history
- Pay securely via Stripe

### 🛠️ **Service Provider Module**
- Register/Login
- Create/Edit/Delete own services
- View service bookings assigned to them
- Update booking status

### 🧑‍💼 **Admin Panel**
- Admin-only access
- Approve or reject services
- View and manage all users, services, and bookings
- Toggle service approval
- View payment information (if available)

---

## 🧰 Tech Stack

| Frontend     | Backend   | State Management               | Styling         | Payment  |
|--------------|-----------|-------------------------------|-----------------|----------|
| ReactJS      | NodeJS    | Redux Toolkit + redux-persist | TailwindCSS v4  | Stripe |
| React Router | ExpressJS | Cookies for Auth              | Cloudinary (optional) | Stripe  |
| Axios        | MongoDB   | JWT                           |                 |          |

---


---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/Geetika981/bharat-service-portal.git
cd bharat
```

2. Setup Backend

```bash
cd backend
npm install
cp .env
# Add your MongoDB URI, JWT secret, Razorpay keys, etc.
npm run dev
```

3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

4. 🔐 Environment Variables (Backend)

```bash
PORT=4000
MONGO_URI=
JWT_SECRET=
NODE_ENV=developement
STRIPE_SECRET_KEY=
```

5. 🔐 Environment Variables (Frontend)
```bash
VITE_API_BASE_URL=
VITE_STRIPE_PUBLISHABLE_KEY=
```

### ✅  **Future Improvements**

- Real-time notifications using Socket.IO
- Service ratings and reviews
- Add image upload to services
- Email & SMS confirmations

  
### 🧑‍💻 **Author**

- 👩‍💻 Geetika Bansal
- geetikabansal304@gmail.com
- www.linkedin.com/in/geetika-bansal-813b44282




