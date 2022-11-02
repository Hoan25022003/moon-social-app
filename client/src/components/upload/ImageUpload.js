import React from "react";
import { useController } from "react-hook-form";

const ImageUpload = ({ children, className, control, name, ...props }) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <label className={className + " cursor-pointer"}>
      <input type="file" name="" className="hidden" {...field} />
      {children}
    </label>
  );
};

export default ImageUpload;
