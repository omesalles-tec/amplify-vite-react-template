import { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import Button from "@cloudscape-design/components/button";
import FileUpload from "@cloudscape-design/components/file-upload";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";

export default function MyFileUpload() {
  const [file, setFile] = useState<File | null>(null); // Cambiado a null

  const handleChange = (event: any) => {
    //setFile(event.target.files[0]);
    console.log(event.detail.value);
    setFile(event.detail.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const result = await uploadData({
        path: `picture-submissions/${file instanceof File ? file.name : ""}`,
        data: file instanceof File ? file : file[0],
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )} %`
              );
            }
          },
        },
      }).result;
      console.log(result);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  /*return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );*/

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <FileUpload
              onChange={handleChange}
              value={file ? [file] : []}
              i18nStrings={{
                uploadButtonText: (e) => (e ? "Choose files" : "Choose file"),
                dropzoneText: (e) =>
                  e ? "Drop files to upload" : "Drop file to upload",
                removeFileAriaLabel: (e) => `Remove file ${e + 1}`,
                limitShowFewer: "Show fewer files",
                limitShowMore: "Show more files",
                errorIconAriaLabel: "Error",
              }}
              showFileLastModified
              showFileSize
              showFileThumbnail
              tokenLimit={3}
            />
            <Button variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </SpaceBetween>
        }
      />
    </form>
  );
}
