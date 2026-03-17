# Rural Rental - Sistema de Login y Registro

## 🎯 Funcionalidades Implementadas

### Página de Login (/)

#### Características Interactivas:
1. **Validación de Formulario en Tiempo Real**
   - Validación de email con formato correcto
   - Validación de contraseña mínima de 6 caracteres
   - Mensajes de error específicos para cada campo
   - Los errores desaparecen al comenzar a escribir

2. **Toggle de Visibilidad de Contraseña**
   - Botón de ojo para mostrar/ocultar contraseña
   - Icono cambia dinámicamente (Eye/EyeOff)

3. **Checkbox "Remember Me"**
   - Estado persistente durante la sesión
   - Funcional y conectado al estado del formulario

4. **Notificaciones Toast**
   - Notificación de éxito al iniciar sesión correctamente
   - Notificación de error si hay problemas
   - Posicionadas en la esquina superior derecha

5. **Loading States**
   - Botón muestra "Logging In..." durante el proceso
   - Botón deshabilitado durante la carga
   - Simulación de llamada API (1.5 segundos)

6. **Login Social**
   - Botones de Google y Apple
   - Notificaciones informativas al hacer clic

7. **Navegación**
   - Link a "Create Account" redirige a /register
   - Link a "Sign Up" en el header redirige a /register
   - Links de navegación en el header (Browse Cabins, Host Your Home, Help)

### Página de Registro (/register)

#### Características Interactivas:
1. **Sistema de Pasos Múltiples**
   - Indicador visual de progreso (Step 1 of 3)
   - Barra de progreso animada
   - Texto descriptivo del paso actual

2. **Validación Completa**
   - Nombre completo (mínimo 3 caracteres)
   - Email con formato válido
   - Teléfono con formato válido (mínimo 10 dígitos)
   - Mensajes de error en tiempo real

3. **Iconos Dinámicos**
   - Iconos de Lucide React en cada campo
   - Iconos de Material Symbols en los trust badges

4. **Notificaciones Progresivas**
   - Notificación al completar cada paso
   - Mensaje final de cuenta creada
   - Redirección automática al login después del registro completo

5. **Registro Social**
   - Botones de Google y Facebook
   - Iconos SVG personalizados con colores de marca

6. **Navegación de Retorno**
   - Link "Back to Login" redirige a /
   - Icono de LogIn incluido

7. **Trust Badges**
   - Badges de seguridad en el footer
   - Iconos de Material Symbols

### Diseño y Estilo

1. **Tipografía Personalizada**
   - Be Vietnam Pro para Login
   - Inter para Registro
   - Google Fonts importadas correctamente

2. **Colores Consistentes**
   - Primary: #2CA58D / #2ba692
   - Accent: #AA4465
   - Neutral: #333745
   - Backgrounds y borders temáticos

3. **Responsive Design**
   - Imagen de fondo en desktop (hidden en mobile)
   - Grid adaptativo en botones sociales
   - Padding y márgenes responsivos

4. **Efectos Visuales**
   - Transiciones suaves en todos los botones
   - Efectos hover en links y botones
   - Efecto active:scale en botón principal
   - Sombras con color de marca

### Tecnologías Utilizadas

- **React Router**: Navegación entre páginas
- **Lucide React**: Iconos modernos
- **Sonner**: Sistema de notificaciones toast
- **React Hooks**: useState para manejo de estado
- **Tailwind CSS**: Estilos utility-first
- **TypeScript**: Tipado fuerte y seguridad

### Flujo de Usuario

1. Usuario llega a la página de login (/)
2. Puede iniciar sesión o hacer clic en "Create Account"
3. Es redirigido a /register
4. Completa el formulario con validación en tiempo real
5. Avanza por los pasos (simulado)
6. Recibe confirmación y es redirigido al login
7. Puede iniciar sesión con sus credenciales

## 🚀 Próximas Mejoras Sugeridas

- Integración con backend real
- Persistencia de datos en localStorage/sessionStorage
- Recuperación de contraseña funcional
- Autenticación OAuth real con Google/Apple/Facebook
- Dashboard post-login
- Perfil de usuario
