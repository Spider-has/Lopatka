import { ExpeditionMap, MapShovel } from '../../icons/Icons';
import './Map.scss';

export type PointProps = {
  id: string;
  cordN: number;
  cordE: number;
  isSelected: boolean;
};

const cordNMin = 55.746077;
const cordEMin = 45.602193;

const cordNMax = 57.204425;
const cordEMax = 50.538242;

export type MapProps = {
  setSelected: (id: string) => void;
  selectedId: string;
  points: PointProps[];
};

// N = y
// E = x
const Point = (props: { point: PointProps; handler: () => void }) => {
  const selectedMod = props.point.isSelected ? 'expedition-map__point_active' : '';
  const x = ((props.point.cordE - cordEMin) / (cordEMax - cordEMin)) * 100;
  const y = 100 - ((props.point.cordN - cordNMin) / (cordNMax - cordNMin)) * 100;
  return (
    <div
      onClick={() => {
        props.handler();
      }}
      style={{ left: x + '%', top: y + '%' }}
      className={`expedition-map__point ${selectedMod}`}
    >
      <MapShovel />
    </div>
  );
};

export const ExpMap = (props: MapProps) => {
  const points = props.points.map((point, i) => {
    const selected = props.selectedId == point.id;
    return (
      <Point
        handler={() => {
          props.setSelected(point.id);
        }}
        point={{ ...point, isSelected: selected }}
        key={i}
      />
    );
  });
  return (
    <div className="expedition-map">
      <ExpeditionMap />
      {points}
    </div>
  );
};
