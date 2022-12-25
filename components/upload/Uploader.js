import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Uploader = ({ img, video, afterUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isUploadedMedia, setIsUploadedMedia] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append("media", file);
    });
    setUploading(true);

    const result = await axios({
      url: "/upload",
      method: "POST",
      data: formData,
    });

    if (result.status === 200) {
      setUploading(false);
      toast.success("Grate, the files have uploaded successfully!");
      setIsUploadedMedia(true);
      afterUpload(result.data);
    }
  };

  useEffect(() => {
    fileList.length > 1 &&
      toast.warn(
        "Sorry, you just can upload a single file( poster or video ). please remove the extra files of the list! "
      );
  }, [fileList]);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (img) {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg"
        ) {
          setFileList([...fileList, file]);
          return;
        }
        return toast.error(
          "The format of the image dose not be supported! please upload an image in ( jpeg / png / jpg ) format! "
        );
      }

      if (video) {
        setFileList([...fileList, file]);
        return;
        // if (file.type === "video/mp4" || file.type === "video/ts") {
        // }
        // return toast.error(
        //   "The format of the video does not be supported! please upload a video in (mp4) format! "
        // );
      }

      return false;
    },

    fileList,
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={
          fileList.length === 0 ||
          fileList.length > 1 ||
          isUploadedMedia === true
        }
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};
export default Uploader;
