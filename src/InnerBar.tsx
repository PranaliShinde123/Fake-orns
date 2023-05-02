interface Props {
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
}

export const InnerBar = ({ height, width, x, y, color }: Props) => {
  return <rect x={x} y={y} width={width} height={height} fill={color} />;
};
