import React from "react";
import { useController } from "react-hook-form";

const PictureUpload = ({
  children,
  className,
  control,
  name,
  onChange,
  ...props
}) => {
  // const { field } = useController({
  //   control,
  //   name,
  // });
  return (
    <label className={className + " cursor-pointer"}>
      <input
        type="file"
        name={name}
        className="hidden"
        onChange={onChange}
        {...props}
        // {...field}
      />
      {children}
    </label>
  );
};

export default PictureUpload;
