# Módulo Card

---

## Estructura y Subcomponentes

| Componente | Subcomponente estático | Descripción |
| :--- | :--- | :--- |
| **`Card`** | `<Card>` | Contenedor raíz con bordes redondeados, sombras, variantes y accesibilidad interactiva. |
| **`CardHeader`** | `<CardHeader>` | Cabecera flexbox con espaciado `px-6 py-4` y borde divisor inferior suave. |
| **`CardTitle`** | `<CardTitle>` | Título semántico configurable (`h1` a `h6`, `span`, `p`) con tipografía destacada (`text-lg font-bold`). |
| **`CardDescription`** | `<CardDescription>` | Subtítulo o texto atenuado (`text-sm text-gray-500 dark:text-gray-400`). |
| **`CardContent`** | `<CardContent>` | Contenedor del contenido principal con espaciado consistente `px-6 py-4`. |
| **`CardFooter`** | `<CardFooter>` | Pie de tarjeta con fondo contrastado, borde superior y distribución `justify-between`. |
| **`CardImage`** | `<CardImage>` | Imagen responsiva con redondeo dinámico según posición (`top`, `middle`, `bottom`), carga lazy y skeleton propio. |
| **`CardSkeleton`** | `<CardSkeleton>` | Tarjeta completa en estado de carga construida con el componente atómico `Skeleton`. |

---

## Variantes Visuales

| Variante | Clases de estilo |
| :--- | :--- |
| **`"default"`** | `border-gray-200 dark:border-gray-800 shadow-xs hover:shadow-md` |
| **`"bordered"`** | `border-gray-300 dark:border-gray-700 shadow-none` |
| **`"elevated"`** | `border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl` |
| **`"flat"`** | `border-transparent bg-gray-50/70 dark:bg-gray-800/40 shadow-none` |

---

## Estados de Carga (Skeleton)

### 1. Carga total en la card

```jsx
<Card loading={isLoading} variant="elevated" hoverable>
	<CardImage src={product.img} alt={product.name} position="top"/>
	<CardHeader>
		<div>
			<CardTitle>{product.name}</CardTitle>
			<CardDescription>{product.category}</CardDescription>
		</div>
	</CardHeader>
	<CardContent>
		<p>{product.description}</p>
	</CardContent>
	<CardFooter>
		<span className="text-xs text-gray-500">Stock: {product.stock}</span>
		<PrimaryButton size="sm">Comprar</PrimaryButton>
	</CardFooter>
</Card>
```

### 2. Carga parcial de imagen (`CardImage isLoading={true}`)

```jsx
<Card variant="default">
	<CardImage
		src={product.imageUrl}
		alt={product.title}
		position="top"
		isLoading={isImageLoading}
		className="h-44"
	/>
	<CardHeader>
		<CardTitle>
			{product.title}
		</CardTitle>
		<CardDescription>
			${product.price}
		</CardDescription>
	</CardHeader>
	<CardContent>
		<p>{product.description}</p>
	</CardContent>
</Card>
```

---

## Interactividad y Accesibilidad por Teclado

Una tarjeta se vuelve interactiva si se especifica `interactive={true}` o si se le pasa una función `onClick`:

* **Rol y navegación:** Se le asigna automáticamente `role="button"` y `tabIndex={0}`, haciéndola accesible por navegación de teclado (Tab).
* **Atajos de teclado:** Presionar `Enter` o `Espacio` dispara el evento `onClick`.
* **Protección de elementos anidados:** Si el usuario presiona `Enter` o `Espacio` dentro de un `<input>`, `<textarea>`, `<select>` o `<button>` contenido dentro de la tarjeta, el evento se ignora para no disparar el `onClick` general de la tarjeta por accidente.
* **Estilos visuales de foco:** Aplica anillo de foco de Tailwind (`focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-cyan-400`).
* **Efecto Hover vs. Interactive:**
	* `hoverable={true}`: Aplica únicamente la elevación suave `-translate-y-1` al pasar el mouse.
	* `interactive={true}`: Aplica cursor pointer, elevación al hover y compresión al clic (`active:translate-y-0`).

```jsx
<Card
	interactive
	hoverable
	onClick={() => navigate(`/productos/${item.id}`)}
>
	<CardHeader>
		<CardTitle>{item.name}</CardTitle>
	</CardHeader>
	<CardContent>
		<p>Ejemplo de interactive</p>
	</CardContent>
</Card>
```

---

## Documentación Detallada de Props

### `<Card>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | - | Subcomponentes o contenido interno de la tarjeta. |
| `variant` | `"default" \| "bordered" \| "elevated" \| "flat"` | `"default"` | Estilo de bordes, fondo y sombras. |
| `hoverable` | `boolean` | `false` | Aplica elevación visual suave al pasar el cursor (`-translate-y-1`). |
| `interactive` | `boolean` | `false` | Convierte la tarjeta en un botón interactivo y accesible por teclado. |
| `loading` | `boolean` | `false` | **Activa el skeleton automático**, infiriendo la posición de la imagen, cabecera y pie a partir de los hijos. |
| `skeleton` | `ReactNode` | `undefined` | Skeleton personalizado opcional que sustituye al generado automáticamente. |
| `skeletonProps` | `object` | `undefined` | Props adicionales para el `CardSkeleton` auto-generado. |
| `onClick` | `(event) => void` | `undefined` | Callback ejecutado al hacer clic o presionar `Enter`/`Espacio`. |
| `onKeyDown` | `(event) => void` | `undefined` | Callback de teclado adicional. |
| `className` | `string` | `""` | Clases Tailwind CSS adicionales que se fusionan con `mergeClasses`. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<div>` del contenedor raíz. |

---

### `<CardImage>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `src` | `string` | **Requerido** | URL de la imagen. |
| `alt` | `string` | `""` | Texto alternativo de la imagen para accesibilidad. |
| `position` | `"top" \| "middle" \| "bottom"` | `"top"` | Posición dentro de la tarjeta: `"top"` (redondea arriba `rounded-t-2xl`), `"middle"` (sin redondeo), `"bottom"` (redondea abajo si no hay footer). |
| `hasFooter` | `boolean` | `false` | Si es `true` y `position="bottom"`, desactiva el redondeo inferior para conectar plano con el pie de tarjeta. |
| `isLoading` | `boolean` | `false` | Reemplaza la imagen por un placeholder animado (Skeleton) con icono SVG. |
| `loading` | `"lazy" \| "eager"` | `"lazy"` | Carga nativa diferida del navegador para optimizar rendimiento. |
| `decoding` | `"async" \| "sync" \| "auto"` | `"async"` | Decodificación asíncrona de la imagen para no bloquear el hilo principal. |
| `className` | `string` | `""` | Clases Tailwind adicionales. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<img>` o `<div>` (cuando está en carga). |

---

### `<CardHeader>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | - | Contenido del encabezado (título, descripción, badges, avatares). |
| `className` | `string` | `""` | Clases Tailwind adicionales. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<div>`. |

---

### `<CardTitle>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span" \| "p"` | `"h3"` | Etiqueta semántica HTML a renderizar. |
| `children` | `ReactNode` | - | Texto o elementos del título. |
| `className` | `string` | `""` | Clases Tailwind adicionales. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM renderizado. |

---

### `<CardDescription>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | - | Texto explicativo o secundario. |
| `className` | `string` | `""` | Clases Tailwind adicionales. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<p>`. |

---

### `<CardContent>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | - | Contenido principal del cuerpo de la tarjeta. |
| `className` | `string` | `""` | Clases Tailwind adicionales. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<div>`. |

---

### `<CardFooter>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | - | Elementos del pie (botones de acción, metadatos, fechas). |
| `className` | `string` | `""` | Clases Tailwind adicionales. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<div>`. |

---

### `<CardSkeleton>`

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "bordered" \| "elevated" \| "flat"` | `"default"` | Variante visual que coincide con la tarjeta final. |
| `hasImage` | `boolean` | `true` | Muestra u oculta el bloque skeleton de imagen. |
| `imagePosition` | `"top" \| "middle" \| "bottom"` | `"top"` | Posición del placeholder de imagen. |
| `imageHeight` | `string` | `"h-48"` | Altura en clases de Tailwind del bloque de imagen. |
| `hasHeader` | `boolean` | `true` | Incluye placeholder de cabecera (título y badge). |
| `hasFooter` | `boolean` | `true` | Incluye placeholder de pie (metadato y botón). |
| `lines` | `number` | `3` | Cantidad de líneas de texto simuladas en el cuerpo. |
| `className` | `string` | `""` | Clases Tailwind adicionales del contenedor. |
| `ref` | `Ref` | `undefined` | Referencia al elemento DOM `<div>`. |