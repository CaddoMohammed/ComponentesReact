# Módulo Skeleton

Componente atómico para estados de carga. Diseñado para simular la silueta y distribución de textos, imágenes, avatares, tarjetas o cualquier elemento de interfaz mientras se descargan o procesan los datos reales.

---

## Documentación de Props

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `variant` | `"text" \| "circular" \| "rectangular" \| "rounded"` | `"text"` | Forma geométrica del elemento. |
| `animation` | `"pulse" \| "none"` | `"pulse"` | Tipo de animación (`animate-pulse` por defecto; `"none"` para deshabilitar). |
| `width` | `number \| string` | `undefined` | Ancho del elemento. |
| `height` | `number \| string` | `undefined` | Alto del elemento. |
| `className` | `string` | `""` | Clases Tailwind CSS personalizadas. Se combinan y resuelven conflictos mediante `mergeClasses`. |
| `style` | `object` | `undefined` | Estilos en línea adicionales. |
| `children` | `ReactNode` | `undefined` | Contenido opcional renderizado dentro del placeholder. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<div>`. |

---

## Accesibilidad

El componente incorpora de forma automática:
* `aria-busy="true"` para indicar a las tecnologías de asistencia que el contenedor se encuentra en proceso de carga.
* `aria-hidden="true"` para que los lectores de pantalla ignoren el contenido visual temporal y no anuncien elementos repetitivos innecesarios.