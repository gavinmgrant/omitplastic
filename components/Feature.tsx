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
  let icon, name;
  switch (feat) {
    case "bpa-free":
      icon = <IconBan />;
      name = "BPA Free";
      break;
    case "compostable":
      icon = <IconPlant />;
      name = "Compostable";
      break;
    case "organic":
      icon = <IconPlant2 />;
      name = "Organic";
      break;
    case "plant-based":
      icon = <IconLeaf />;
      name = "Plant-based";
      break;
    case "plastic-free-packaging":
      icon = <IconPackage />;
      name = "Plastic-free packaging";
      break;
    case "plastic-free-product":
      icon = <IconSquareMinus />;
      name = "Plastic-free product";
      break;
    case "recycled-content":
      icon = <IconRecycle />;
      name = "Recycled content";
      break;
    case "reusable":
      icon = <IconRepeat />;
      name = "Reusable";
      break;
    default:
      icon = "";
  }
  return (
    <li className="flex mb-2">
      {icon}<span className="ml-2">{text && name}</span>
    </li>
  );
};

export default Feature;
