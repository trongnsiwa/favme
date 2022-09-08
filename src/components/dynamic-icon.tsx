import * as Icons from "react-icons/fa";

type DynamicFaIconProps = {
  name: keyof typeof Icons;
  color: string;
};

export const DynamicFaIcon = ({ name, color }: DynamicFaIconProps) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Return a default one
    return <Icons.FaStar />;
  }

  return <IconComponent color={color} />;
};
