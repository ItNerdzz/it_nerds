'use client';
import { FC } from 'react';
import { Cloud, renderSimpleIcon } from 'react-icon-cloud';
import {
  siReact,
  siNextdotjs,
  siJson,
  siJavascript,
  siPhp,
  siHtml5,
  siAdobephotoshop,
  siLaravel,
  siWordpress,
  siFigma,
  siTypescript,
  siWoocommerce,
  siCss3,
  siCssmodules,
  siStyledcomponents,
  siPython,
  siNodedotjs,
} from 'simple-icons';

const iconsList = [
  siReact,
  siNextdotjs,
  siJson,
  siJavascript,
  siPhp,
  siHtml5,
  siAdobephotoshop,
  siLaravel,
  siWordpress,
  siFigma,
  siTypescript,
  siWoocommerce,
  siCss3,
  siCssmodules,
  siStyledcomponents,
  siPython,
  siNodedotjs,
];

const IconCloud: FC = () => {
  const icons = iconsList.map((icon) => {
    return renderSimpleIcon({
      icon,
      size: 42,
      aProps: {
        onClick: (e: any) => e.preventDefault(),
      },
    });
  });

  const cloudOptions = {
    wheelZoom: false,
    depth: 1,
    initial: [0.1, -0.1],
    outlineColour: 'transparent',
    imageScale: 2,
    dragControl: false,
    // dragThreshold: number,
  };

  return (
    <Cloud id={'iconCloud'} options={cloudOptions}>
      {icons}
    </Cloud>
  );
};

export default IconCloud;
