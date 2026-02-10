import { Widget } from "./Widget";
import React from "react";

// Ejemplo 1: Widget pequeño (1 columna, altura mínima 200px)
export function SmallWidget() {
  return (
    <Widget
      title="Quick Stats"
      minColumns={1}
      minHeight={200}
      showMenuButton={true}
    >
      <div className="flex flex-col gap-4 p-6 w-full">
        <div className="text-3xl font-bold text-black">1,234</div>
        <div className="text-sm text-gray-500">Total conversations</div>
      </div>
    </Widget>
  );
}

// Ejemplo 2: Widget mediano (2 columnas, altura mínima 320px)
export function MediumWidget() {
  return (
    <Widget
      title="Performance Metrics"
      minColumns={2}
      minHeight={320}
      showFilterButton={false}
      showMenuButton={true}
    >
      <div className="flex items-center justify-center w-full h-full text-gray-400">
        Chart or table content here
      </div>
    </Widget>
  );
}

// Ejemplo 3: Widget grande (3 columnas, altura mínima 400px)
export function LargeWidget() {
  return (
    <Widget
      title="Detailed Analytics"
      minColumns={3}
      minHeight={400}
      showFilterButton={true}
      showMenuButton={true}
    >
      <div className="flex flex-col gap-4 p-6 w-full">
        <div className="text-sm text-gray-600">
          Complex visualizations or detailed data tables would go here
        </div>
      </div>
    </Widget>
  );
}

// Ejemplo 4: Widget de ancho completo (4 columnas)
export function FullWidthWidget() {
  return (
    <Widget
      title="Activity Timeline"
      minColumns={4}
      minHeight={250}
      showMenuButton={true}
    >
      <div className="flex items-center justify-center w-full h-full text-gray-400">
        Timeline content spanning full width
      </div>
    </Widget>
  );
}
