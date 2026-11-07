# Módulo de Botones

## Componentes Disponibles

1. **[`Button`](#button)**: Componente base con soporte para spinner de carga (`loading`), estados deshabilitados y accesibilidad.
2. **[`PrimaryButton`](#primarybutton)**: Componente `Button` con un bg-cyan.
3. **[`SecondaryButton`](#secondarybutton)**: Componente `Button` con un bg-white o bg-gray segun el modo de color detectado respectivamente.
4. **[`DangerButton`](#dangerbutton)**: Componente `Button` con un bg-red.

---

## Documentación de Componentes

### 1. `Button`

Componente base polivalente que encapsula la lógica de carga, prevención de clics repetidos, combinación de clases y atributos de accesibilidad.

#### Características
- **Spinner integrado**: Al activar `loading={true}`, muestra un indicador de carga animado a la izquierda del texto y deshabilita automáticamente el botón.
- **Accesibilidad**: Incluye `aria-busy={loading}`, `aria-disabled` y texto oculto para lectores de pantalla (`loadingText`).
- **Diseño responsivo**: Ajusta automáticamente tamaño de tipografía y padding en pantallas pequeñas (`max-sm`) frente a pantallas de escritorio.
- **Fusión de clases**: Utiliza la utilidad `mergeClasses` para sobreescribir o extender clases de Tailwind sin conflictos.

#### Props

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | **Requerido** | Contenido del botón (texto, iconos, etc.). |
| `onClick` | `(event) => void` | `undefined` | Función ejecutada al hacer clic. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Tipo nativo del botón HTML. |
| `loading` | `boolean` | `false` | Muestra el spinner de carga y desactiva el botón. |
| `disabled` | `boolean` | `false` | Deshabilita el botón e interactividad. |
| `className` | `string` | `""` | Clases Tailwind CSS personalizadas adicionales. |
| `spinnerColor` | `string` | `"text-white"` | Clase de color Tailwind para el spinner SVG. |
| `loadingText` | `string` | `"Cargando..."` | Texto accesible para lectores de pantalla (`sr-only`) durante la carga. |
| `...props` | `HTMLAttributes` | - | Cualquier otro atributo nativo de `<button>` (`id`, `title`, `aria-*`, etc.). |

#### Ejemplo de uso:
```jsx
	<Button
		loading={isSubmitting}
		loadingText="Guardando cambios..."
		onClick={handleSubmit}
		className="bg-indigo-600 text-white hover:bg-indigo-700"
	>
		Guardar información
	</Button>
```