import React from 'react';
import { Svg, Circle, Rect } from '@react-pdf/renderer';

/**
 *
 * svg viewbox
 * width:  272
 * height: 265
 *
 */

function SVGShape(props) {
  const drawRectangle = (
    sizeAcross,
    sizeAround,
    cavAcross,
    cavAround,
    gapAcross,
    gapAround,
    cornerRadius,
    teeth
  ) => {
    let totalAcross = (sizeAcross + gapAcross) * cavAcross - gapAcross;
    let totalAround = (sizeAround + gapAround) * cavAround;
    let pageWidth = getDieSize(sizeAcross, gapAcross, cavAcross);
    let pageHeight = teeth / 8;
    let shapes = [];
    var i, j;
    let scale = undefined;
    /*console.log({
      sizeAcross,
      sizeAround,
      cavAcross,
      cavAround,
      gapAcross,
      gapAround,
      cornerRadius,
      teeth,
      totalAcross,
      totalAround,
      pageWidth,
      pageHeight
    });*/
    for (i = 0; i < cavAround; i++) {
      for (j = 0; j < cavAcross; j++) {
        let x = (pageWidth - totalAcross) / 2 + (sizeAcross + gapAcross) * j;
        let y = (pageHeight - totalAround) / 2 + (sizeAround + gapAround) * i;
        scale = 265 / pageHeight;
        let rect = (
          <Rect
            x={x * scale}
            y={y * scale}
            width={sizeAcross * scale}
            height={sizeAround * scale}
            rx={cornerRadius * scale}
            ry={cornerRadius * scale}
            stroke='black'
            stroke-width='0.35'
            fill-opacity='0'
            key={i * cavAcross + j}
          />
        );
        shapes.push(rect);
      }
    }
    return (
      <Svg width={pageWidth * scale} height='265' debug={false}>
        {shapes}
      </Svg>
    );
  };

  const drawCircle = (diameter, cavAcross, cavAround, gapAcross, gapAround, teeth) => {
    const radius = diameter / 2;
    let totalAcross = (diameter + gapAcross) * cavAcross - gapAcross;
    let totalAround = (diameter + gapAround) * cavAround;
    let pageWidth = getDieSize(radius, gapAcross, cavAcross);
    let pageHeight = teeth / 8;
    let shapes = [];
    var i, j;
    let scale = undefined;
    console.log({
      radius,
      cavAcross,
      cavAround,
      gapAcross,
      gapAround,
      teeth,
      totalAcross,
      totalAround,
      pageWidth,
      pageHeight
    });
    for (i = 0; i < cavAround; i++) {
      for (j = 0; j < cavAcross; j++) {
        let cx = (pageWidth - totalAcross) / 2 + (diameter + gapAcross) * j + radius;
        let cy = (pageHeight - totalAround) / 2 + (diameter + gapAround) * i + diameter;
        scale = 200 / pageHeight; //265
        let circle = (
          <Circle
            cx={cx * scale}
            cy={cy * scale}
            r={radius * scale}
            stroke='black'
            stroke-width='0.2'
            fill-opacity='0'
            key={i * cavAcross + j}
          />
        );
        shapes.push(circle);
      }
    }
    return (
      <Svg width={pageWidth * scale} height='265'>
        {shapes}
      </Svg>
    );
  };

  switch (props.shape) {
    case 'Rectangular':
      try {
        console.log(
          props.size
            .trim()
            .replace(' ', '')
            .match(/([0-9.]*)/g)
            .filter(el => {
              return el !== '';
            })
        );
        let sizeAcross = props.size
          .trim()
          .replace(' ', '')
          .match(/([0-9.]*)/g)
          .filter(el => {
            return el !== '';
          })[0];
        let sizeAround = props.size
          .trim()
          .replace(' ', '')
          .match(/([0-9.]*)/g)
          .filter(el => {
            return el !== '';
          })[1];
        return drawRectangle(
          convertTo('in', sizeAcross + props.unitSize),
          convertTo('in', sizeAround + props.unitSize),
          parseInt(props.cavAcross),
          parseInt(props.cavAround),
          convertTo('in', props.gapAcross + props.unitGapAcross),
          convertTo('in', props.gapAround + props.unitGapAround),
          convertTo('in', props.cornerRadius + props.unitCornerRadius),
          parseInt(props.teeth)
        );
      } catch (e) {
        console.log('failed');
        console.log(e);
        return null;
      }

    case 'Circular':
      try {
        let radius = props.size
          .trim()
          .replace(' ', '')
          .match(/([0-9.]*)/g)
          .filter(el => {
            return el !== '';
          })[0];
        return drawCircle(
          convertTo('in', radius + props.unitSize),
          parseInt(props.cavAcross),
          parseInt(props.cavAround),
          convertTo('in', props.gapAcross + props.unitGapAcross),
          convertTo('in', props.gapAround + props.unitGapAround),
          parseInt(props.teeth)
        );
      } catch (e) {
        return null;
      }

    default:
      return null;
  }
}

const getDieSize = (Longitude, Gap, Cav) => {
  let Size = 7;
  let TotalAcross = (Longitude + Gap) * Cav;
  let Roof = parseInt(Math.ceil(TotalAcross));
  if (Roof < 7) Size = 7;

  if (Roof < 7) Size = 7;
  if (Roof <= 10 && Roof > 7) Size = 10;
  if (Roof <= 13 && Roof > 10) Size = 13;
  if (Roof > 13) Size = Roof + 2;
  return Size;
};

const parseUnits = dim => {
  console.log(dim);
  return {
    mag: parseFloat(dim.match(/([0-9]*\.?[0-9]*)/g)[0]),
    unit: dim.match(/([a-z]){2}/g)[0]
  };
};

const convertTo = (unit, dim) => {
  dim = parseUnits(dim);
  if (dim.unit === unit) {
    return dim.mag;
  } else if (unit === 'mm') {
    return dim.mag * 25.4;
  } else if (unit === 'in') {
    return dim.mag / 25.4;
  }
};

export default SVGShape;
