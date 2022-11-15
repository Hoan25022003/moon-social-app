import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Overlay from "components/common/Overlay";
import ModalHeading from "components/modal/ModalHeading";
import PictureAvatarBig from "components/picture/PictureAvatarBig";
import PictureCover from "components/picture/PictureCover";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PictureUpload from "components/picture/PictureUpload";
import ButtonGradient from "components/button/ButtonGradient";
import FormGroup from "components/form/FormGroup";
import Label from "components/form/Label";
import Input from "components/form/Input";
import { TextareaAutosize, MenuItem } from "@mui/material";
import Dropdown from "components/dropdown/Dropdown";
import ModalLine from "components/modal/ModalLine";

const schema = yup.object({
  firstName: yup
    .string()
    .required("This is required field")
    .min(2, "Name have at least 2 characters"),
  lastName: yup
    .string()
    .required("This is required field")
    .min(2, "Name have at least 2 characters"),
  desc: yup.string().max(150),
  workAt: yup.string().max(50),
});

const ProfileEdit = ({ handleHideModal }) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const watchDesc = watch("desc");
  const handleEditProfile = (values) => {
    console.log(values);
  };
  return (
    <Overlay handleHideModal={handleHideModal} alignCenter={true}>
      <div className="w-[600px] mx-auto bg-white z-50 rounded-xl show-modal">
        <ModalHeading handleHideModal={handleHideModal}>
          Edit profile
        </ModalHeading>
        <ModalLine />
        <form onSubmit={handleSubmit(handleEditProfile)}>
          <div className="max-h-[500px] overflow-auto">
            <div className="relative">
              <PictureCover src="https://pbs.twimg.com/profile_banners/998963083816022017/1527006522/1080x360">
                <div className="absolute inset-0 flex items-center bg-black bg-opacity-25">
                  <PictureUpload
                    className="flex items-center justify-center w-12 h-12 mx-auto transition-all bg-black bg-opacity-50 rounded-full hover:bg-opacity-40"
                    control={control}
                    name="coverImg"
                  >
                    <CameraAltOutlinedIcon className="text-white" />
                  </PictureUpload>
                </div>
              </PictureCover>
              <PictureAvatarBig
                avatar="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                alt="Hoan Do"
                size={110}
              >
                <div className="absolute inset-0 flex items-center bg-black bg-opacity-25 rounded-full cursor-default">
                  <PictureUpload
                    className="flex items-center justify-center w-10 h-10 mx-auto transition-all bg-black bg-opacity-50 rounded-full hover:bg-opacity-40"
                    control={control}
                    name="avatar"
                  >
                    <CameraAltOutlinedIcon className="text-white" />
                  </PictureUpload>
                </div>
              </PictureAvatarBig>
            </div>
            <div className="flex flex-col px-5 mt-16 gap-y-4">
              <div className="grid grid-cols-2 gap-x-6">
                <FormGroup>
                  <Label name="firstName" className="mb-2">
                    First Name
                  </Label>
                  <Input
                    control={control}
                    name="firstName"
                    placeholder="First Name"
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label name="lastName" className="mb-2">
                    Last Name
                  </Label>
                  <Input
                    control={control}
                    name="lastName"
                    placeholder="First Name"
                  ></Input>
                </FormGroup>
              </div>
              <FormGroup>
                <div className="flex items-center justify-between mb-2">
                  <Label name="desc">Description</Label>
                  <span
                    className={`text-sm font-normal ${
                      watchDesc?.length > 150 ? "text-errorColor" : "text-text3"
                    } `}
                  >
                    {watchDesc?.length || 0}/150
                  </span>
                </div>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Let's describe to yourself"
                  className="w-full px-5 py-4 text-base transition-all border border-strock rounded-xl focus:border-primary"
                  name="desc"
                  minRows={3}
                  maxRows={3}
                  watch={watch}
                  {...register("desc")}
                />
              </FormGroup>
              <FormGroup>
                <Label className="mb-2">Birthday</Label>
                <div className="grid grid-cols-3 gap-x-4">
                  <Dropdown
                    label="Day"
                    handleExtra={(value) => setValue("day", value)}
                  >
                    {Array(31)
                      .fill()
                      .map((item, i) => (
                        <MenuItem value={i + 1} key={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                  </Dropdown>
                  <Dropdown
                    label="Month"
                    handleExtra={(value) => setValue("month", value)}
                  >
                    {Array(12)
                      .fill()
                      .map((item, i) => (
                        <MenuItem value={i + 1} key={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                  </Dropdown>
                  <Dropdown
                    label="Year"
                    handleExtra={(value) => setValue("year", value)}
                  >
                    {Array(2022)
                      .fill()
                      .map(
                        (item, i) =>
                          i + 1 > 1970 && (
                            <MenuItem value={i + 1} key={i + 1}>
                              {i + 1}
                            </MenuItem>
                          )
                      )}
                  </Dropdown>
                </div>
              </FormGroup>
              <FormGroup>
                <Label className="mb-2" name="workAt">
                  Work At
                </Label>
                <Input
                  control={control}
                  name="workAt"
                  placeholder="Place work/study"
                ></Input>
              </FormGroup>
            </div>
          </div>
          <div className="my-5 text-center">
            <ButtonGradient
              className={`w-[200px] py-4 rounded-xl font-bold text-base ${
                (Object.keys(errors).length > 0 || !isDirty) &&
                "opacity-30 pointer-events-none"
              } transition-all`}
              type="submit"
              isLoading={isSubmitting}
            >
              Update
            </ButtonGradient>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default ProfileEdit;
