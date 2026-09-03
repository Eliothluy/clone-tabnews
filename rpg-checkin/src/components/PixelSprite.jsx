// Renderiza uma matriz de pixels como SVG (1 rect por segmento horizontal),
// mantendo as bordas nítidas em qualquer escala.
export function PixelSprite({ rows, palette, className, label }) {
  const width = rows[0]?.length ?? 0;
  const height = rows.length;

  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === ".") {
        x++;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      const color = palette[ch];
      if (color) {
        rects.push(
          <rect key={`${y}-${x}`} x={x} y={y} width={end - x} height={1} fill={color} />,
        );
      }
      x = end;
    }
  });

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rects}
    </svg>
  );
}
