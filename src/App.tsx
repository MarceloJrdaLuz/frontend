import React from "react";

import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";

import { useFiles } from "./context/files";
import Menu from "./components/Menu";
import TituloPage from "./components/TituloPage";
import ConfirmDelete from "./components/ConfirmDelete";

const App: React.FC = () => {
  const {
    pdfShow, handlePdfShow, handleShowConfirmDelete,
    item, itemDeleteName, notConfirmeDelete,
    showConfirmDelete,
  } = useFiles();

  return (
    <Container>
      <Menu />
      <TituloPage pdfShow={pdfShow} item={item} onChangePdfShow={handlePdfShow} />
      {showConfirmDelete ? (
        <ConfirmDelete uploadFileName={itemDeleteName} onChangeShowTrue={handleShowConfirmDelete} onChangeShowFalse={notConfirmeDelete} />
      ) : (
        <Content>
          <Upload />
          <FileList />
        </Content>
      )}
      <GlobalStyle />
    </Container>
  )
}

export default App;