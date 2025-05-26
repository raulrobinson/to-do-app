# to-do-app

APP demo for To Do tasks and categories

✅ 1. Requisitos previos
Instalado:

- Node.js
- Ionic CLI:
```bash
npm install -g @ionic/cli
```

✅ 2. Instalar Capacitor y configurar Android
```bash
ionic build
npx cap add android
npx cap sync
```

✅ 3. Abrir el proyecto en Android Studio
```bash
npx cap open android
```

✅ 4. Conectar tu teléfono Android
- Conectar teléfono vía USB
- Asegúrar que la depuración USB esté activada
- Verificar que sea reconocido:
```bash
adb devices
```

✅ 5. Compilar e instalar la app
Desde Android Studio:

- Hacer clic en Run ▶️ (Selecciona dispositivo físico como destino)
- La app se compilará y se instalará en el teléfono

🔄 Reinstalar app tras cambios
```bash
ionic build
npx cap copy android
npx cap open android
```
