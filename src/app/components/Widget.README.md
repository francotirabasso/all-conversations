# Widget Component

Componente reutilizable para crear widgets de dashboard con header, título, botones y contenido personalizable.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | - | **Requerido**. Título del widget |
| `minColumns` | `1 \| 2 \| 3 \| 4` | `1` | Ancho mínimo en columnas del grid (de 4 columnas) |
| `minHeight` | `number` | `320` | Alto mínimo en píxeles |
| `children` | `ReactNode` | - | **Requerido**. Contenido del widget |
| `showFilterButton` | `boolean` | `false` | Mostrar botón de filtro |
| `showMenuButton` | `boolean` | `true` | Mostrar botón de menú (3 puntos) |
| `filterButton` | `ReactNode` | - | Componente personalizado para el botón de filtro |
| `menuButton` | `ReactNode` | - | Componente personalizado para el botón de menú |
| `className` | `string` | `""` | Clases adicionales para el contenedor |

## Uso Básico

```tsx
import { Widget } from "@/app/components/Widget";

function MyWidget() {
  return (
    <Widget title="Mi Widget" minColumns={2} minHeight={320}>
      <div className="p-6">
        Contenido del widget aquí
      </div>
    </Widget>
  );
}
```

## Ejemplos

### Widget pequeño (1 columna)

```tsx
<Widget title="Quick Stats" minColumns={1} minHeight={200}>
  <div className="flex flex-col gap-4 p-6">
    <div className="text-3xl font-bold">1,234</div>
    <div className="text-sm text-gray-500">Total items</div>
  </div>
</Widget>
```

### Widget mediano con filtros (2 columnas)

```tsx
import { MenuWithDot } from "@/app/components/MenuWithDot";

<Widget
  title="Performance Metrics"
  minColumns={2}
  minHeight={320}
  showFilterButton={true}
  filterButton={<MenuWithDot onFiltersChange={(count) => console.log(count)} />}
>
  <div className="p-6">
    Gráfico o tabla aquí
  </div>
</Widget>
```

### Widget grande (3-4 columnas)

```tsx
<Widget title="Detailed Analytics" minColumns={3} minHeight={400}>
  <div className="p-6">
    Visualizaciones complejas aquí
  </div>
</Widget>
```

## Layout en Dashboard

Para usar los widgets en un dashboard con grid de 4 columnas:

```tsx
export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-3 w-full auto-rows-fr">
      <Widget title="Widget 1" minColumns={2}>...</Widget>
      <Widget title="Widget 2" minColumns={1}>...</Widget>
      <Widget title="Widget 3" minColumns={1}>...</Widget>
      <Widget title="Widget 4" minColumns={4}>...</Widget>
    </div>
  );
}
```

## Comportamiento

- **Ancho**: El widget ocupará `minColumns` del grid de 4 columnas como mínimo. Si hay espacio disponible, se expandirá para llenarlo (usa `h-full` y `w-full`).
- **Alto**: El widget tiene un alto mínimo de `minHeight` px, pero crecerá verticalmente para igualar la altura de la fila más alta del grid (gracias a `auto-rows-fr`).
- **Responsive**: Todos los widgets en una fila del grid tendrán la misma altura.

## Estructura Interna

El componente incluye:
- **Grip**: Ícono de arrastre (esquina superior izquierda)
- **Header**: Título y botones de acción
- **Content Area**: Contenedor flexible para el contenido
- **Border**: Borde decorativo de 8px de radio

## Personalización

Puedes pasar botones personalizados usando las props `filterButton` y `menuButton`:

```tsx
<Widget
  title="Custom Widget"
  filterButton={<MyCustomFilterButton />}
  menuButton={<MyCustomMenuButton />}
>
  Content
</Widget>
```
