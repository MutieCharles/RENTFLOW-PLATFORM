client/
├── index.html
├── tsconfig.json
├── vite.config.ts
├── package.json
├── public/
│   └── favicon.ico
└── src/
    ├── main.tsx          # App entry point
    ├── App.tsx           # Root component
    ├── components/
    │   ├── RoomMatrix.tsx
    │   ├── Dashboard.tsx
    │   └── Navbar.tsx
    ├── pages/
    │   ├── Login.tsx
    │   ├── Tenants.tsx
    │   ├── Payments.tsx
    │   └── Onboarding.tsx
    ├── hooks/
    │   └── useAuth.ts
    ├── lib/
    │   ├── apiClient.ts
    │   └── queryClient.ts
    ├── styles/
    │   └── index.css
    └── types/
        └── models.ts
# RentRoll Client Project Structure