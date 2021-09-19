import React from "react";
import dynamic from "next/dynamic";
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

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});
interface Props {
  key: any;
  feat: string;
  text: boolean;
  onClick?: () => void;
}

const Feature: React.FC<Props> = ({ feat, text }) => {
  let icon, name;
  switch (feat) {
    case "bpa-free":
      icon = <IconBan size={28} />;
      name = "BPA Free";
      break;
    case "compostable":
      icon = <IconPlant size={28} />;
      name = "Compostable";
      break;
    case "organic":
      icon = <IconPlant2 size={28} />;
      name = "Organic";
      break;
    case "plant-based":
      icon = <IconLeaf size={28} />;
      name = "Plant-based";
      break;
    case "plastic-free-packaging":
      icon = <IconPackage size={28} />;
      name = "Plastic-free packaging";
      break;
    case "plastic-free-product":
      icon = <IconSquareMinus size={28} />;
      name = "Plastic-free product";
      break;
    case "recycled-content":
      icon = <IconRecycle size={28} />;
      name = "Recycled content";
      break;
    case "reusable":
      icon = <IconRepeat size={28} />;
      name = "Reusable";
      break;
    default:
      icon = "";
  }
  return (
    <li className="flex mb-1 items-center cursor-pointer">
      <span data-tip={!text ? name : ""} date-place="top">
        {icon}
      </span>
      <span className="ml-2">{text && name}</span>
      <ReactTooltip />
    </li>
  );
};

export default Feature;
