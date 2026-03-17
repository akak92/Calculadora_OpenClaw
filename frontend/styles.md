# 🎨 Ideas de Estilos — Interfaz Gráfica Calculadora

## Paleta de colores sugerida
- Fondo: `#1a1a2e` (azul oscuro) o `#f5f5f5` (gris claro)
- Primario: `#0f3460` o `#4361ee`
- Botones: `#e94560` (rojo para operadores), `#16213e` (números)
- Texto: `#ffffff` o `#212529`
- Resultado: `#00b4d8` (azul cyan)

## Layout general
- Diseño centrado en pantalla (flexbox/grid)
- Ancho máximo: 360px, con border-radius generoso (16px)
- Sombra suave: `box-shadow: 0 8px 32px rgba(0,0,0,0.3)`

## Pantalla de resultado
- Display tipo LCD: fondo oscuro, fuente monoespaciada (`font-family: 'Courier New'`)
- Tamaño de fuente grande (2.5rem), alineado a la derecha
- Dos líneas: expresión arriba (pequeño, gris) y resultado abajo (grande, blanco)

## Botones
- Grid 4 columnas, gap de 8px
- Tamaño uniforme: 70px x 70px
- Hover: escala leve (`transform: scale(1.05)`) + cambio de color
- Active: `transform: scale(0.97)` para feedback táctil
- Botón `=`: color destacado, puede ocupar 2 columnas

## Tipografía
- Fuente principal: `Roboto` o `Inter` (Google Fonts)
- Números en botones: bold, 1.2rem
- Operadores: 1.4rem

## Variantes de tema
- **Dark mode** (recomendado por defecto): fondo oscuro, botones con glassmorphism
- **Light mode**: fondo blanco roto, sombras suaves
- Toggle de tema en la esquina superior derecha

## Accesibilidad
- Contraste mínimo AA (WCAG 2.1)
- Focus visible en teclado (`outline: 2px solid #4361ee`)
- `aria-label` en cada botón
