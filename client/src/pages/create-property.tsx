import React, { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";
import Form from "components/common/Form";

const CreateProperty = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [propetyImage, setPropetyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
    
  const handleImageChange = (file:File) => {
    const reader = (readFile:File)=> new Promise<string>
    ((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    })

    reader(file).then((result:string)=>setPropetyImage({
      name:file?.name,
      url: result,
    }))
  };
  const onFinishHandler = async (data:FieldValues) => {
    if(!propetyImage.name) return alert('Please select an image');

    await onFinish({ ...data, photo: propetyImage.url,email:user.email });
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
      handleImageChange={handleImageChange}
      propertyImage={propetyImage}
    />
  );
};

export default CreateProperty;
