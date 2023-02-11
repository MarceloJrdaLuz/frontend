import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFiles } from "../../context/files";

import { DropContainer, UploadMessage } from "./styles";

function Upload() {
  const { handleUpload } = useFiles();

  const onDrop = useCallback(
    (files: any) => {
      handleUpload(files);
    },
    [handleUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: ["image/*", "application/pdf"],
    onDrop,
  });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <UploadMessage>Arraste os arquivos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Tipo de arquivo não suportado
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {renderDragMessage()}
    </DropContainer>
  );
}

export default Upload;