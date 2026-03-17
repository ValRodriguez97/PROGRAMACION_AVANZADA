# 🚀 Instalación del Proyecto Angular - Rural Rental

## 📋 Requisitos Previos
- Node.js (v18 o superior)
- Angular CLI v17+ instalado globalmente: `npm install -g @angular/cli`

## 🛠️ Configuración del Proyecto

### 1. Crear un nuevo proyecto Angular (si aún no tienes uno)
```bash
ng new rural-rental
# Selecciona:
# - Routing: Yes
# - Stylesheet: CSS
cd rural-rental
```

### 2. Instalar Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 3. Configurar Tailwind CSS

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#2CA58D",
        "accent": "#AA4465",
        "neutral-text": "#333745",
        "border-subtle": "#E1E5F2",
        "background-light": "#f8f6f7",
      },
      fontFamily: {
        "display": ["Be Vietnam Pro", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
```

### 4. Configurar estilos globales

**src/styles.css:**
```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Be Vietnam Pro', sans-serif;
}
```

### 5. Estructura de Carpetas

Crea la siguiente estructura en tu proyecto:

```
src/
├── app/
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.css
│   ├── register/
│   │   ├── register.component.ts
│   │   ├── register.component.html
│   │   └── register.component.css
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.config.ts
│   └── app.routes.ts
```

### 6. Copiar los archivos

Copia los archivos de la carpeta `ANGULAR_CODE/` a tu proyecto:

- `login.component.ts` → `src/app/login/login.component.ts`
- `login.component.html` → `src/app/login/login.component.html`
- `login.component.css` → `src/app/login/login.component.css`
- `register.component.ts` → `src/app/register/register.component.ts`
- `register.component.html` → `src/app/register/register.component.html`
- `register.component.css` → `src/app/register/register.component.css`
- `app.routes.ts` → `src/app/app.routes.ts`
- `app.config.ts` → `src/app/app.config.ts`

### 7. Actualizar app.component.ts

**src/app/app.component.ts:**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {
  title = 'rural-rental';
}
```

### 8. Actualizar main.ts

**src/main.ts:**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

## 🎨 Librería de Notificaciones (Opcional)

Para mejorar las notificaciones toast, instala una de estas librerías:

### Opción 1: ngx-toastr (Recomendado)
```bash
npm install ngx-toastr
npm install @angular/animations
```

**Actualizar app.config.ts:**
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ]
};
```

**Importar estilos en angular.json:**
```json
"styles": [
  "src/styles.css",
  "node_modules/ngx-toastr/toastr.css"
]
```

**Actualizar componentes (login.component.ts y register.component.ts):**
```typescript
import { ToastrService } from 'ngx-toastr';

constructor(private router: Router, private toastr: ToastrService) {}

private showToast(type: 'success' | 'error' | 'info', title: string, message: string): void {
  this.toastr[type](message, title);
}
```

### Opción 2: PrimeNG Toast
```bash
npm install primeng primeicons
```

## ▶️ Ejecutar el Proyecto

```bash
ng serve
```

Abre tu navegador en `http://localhost:4200`

## 📱 Funcionalidades Implementadas

### Login (/)
- ✅ Validación de username, email y password
- ✅ Checkbox "Ingresar como propietario"
- ✅ Campo de "Palabra de Acceso" que se desbloquea con checkbox
- ✅ Toggle para mostrar/ocultar contraseñas
- ✅ Remember me
- ✅ Login social (Google, Apple)
- ✅ Navegación a registro

### Register (/register)
- ✅ Sistema de 3 pasos funcional
- ✅ Paso 1: Información personal (nombre, email, teléfono)
- ✅ Paso 2: Credenciales (username, password, confirmación)
- ✅ Checkbox "Crear cuenta como propietario"
- ✅ Campo "Palabra de Acceso" que se desbloquea con checkbox
- ✅ Paso 3: Resumen y confirmación
- ✅ Validaciones completas en cada paso
- ✅ Navegación entre pasos (Back/Continue)
- ✅ Registro social (Google, Facebook)

## 🎯 Características Técnicas

- **Standalone Components**: Todos los componentes son standalone (Angular 17+)
- **Reactive Forms**: Usando ngModel con FormsModule
- **Routing**: Configurado con RouterModule
- **Tailwind CSS**: Diseño completamente responsivo
- **Validaciones**: En tiempo real con feedback visual
- **Animaciones**: Transiciones suaves entre estados
- **TypeScript**: Tipado fuerte para mayor seguridad

## 🔧 Personalización

### Cambiar colores
Edita `tailwind.config.js` en la sección `colors`

### Integrar con Backend
Reemplaza las simulaciones de `setTimeout` con llamadas HTTP:

```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient, private router: Router) {}

async onSubmit(): Promise<void> {
  // ...validaciones...
  
  this.isLoading = true;
  try {
    const response = await this.http.post('/api/login', this.formData).toPromise();
    this.showToast('success', 'Login exitoso', 'Bienvenido');
    this.router.navigate(['/dashboard']);
  } catch (error) {
    this.showToast('error', 'Error', 'Credenciales inválidas');
  } finally {
    this.isLoading = false;
  }
}
```

## 📞 Soporte

Si tienes problemas con la instalación o integración, verifica:
- ✅ Versión de Node.js
- ✅ Versión de Angular CLI
- ✅ Configuración de Tailwind CSS
- ✅ Importaciones de módulos

## 🚀 ¡Listo!

Tu aplicación Angular de Rural Rental está lista para usar. Las funcionalidades son idénticas a la versión React, manteniendo el mismo diseño y comportamiento.
