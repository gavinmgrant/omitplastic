import React from "react";
import {
  IconBan,
  IconPlant,
  IconPlant2,
  IconLeaf,
  IconPackage,
  IconSquareMinus,
  IconRecycle,
  IconRepeat,
} from "@tabler/icons";

interface Props {
  feat: string;
  text: boolean;
};

const Feature: React.FC<Props> = ({ feat, text }) => {
  let icon;
  switch (feat) {
    case "BPA-free":
      icon = <IconBan />;
      break;
    case "Compostable":
      icon = <IconPlant />;
      break;
    case "Organic":
      icon = <IconPlant2 />;
      break;
    case "Plant-based":
      icon = <IconLeaf />;
      break;
    case "Plastic-free packaging":
      icon = <IconPackage />;
      break;
    case "Plastic-free product":
      icon = <IconSquareMinus />;
      break;
    case "Recycled content":
      icon = <IconRecycle />;
      break;
    case "Reusable":
      icon = <IconRepeat />;
      break;
    default:
      icon = "";
  }
  return (
    <li className="flex mb-2">
      {icon}<span className="ml-2">{text && feat}</span>
    </li>
  );
};

export default Feature;
