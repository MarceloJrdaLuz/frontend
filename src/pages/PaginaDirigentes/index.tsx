import React from "react";
import Menu from "../../components/Menu";
import ModalAddDirigente from "../../components/ModalAddDirigente";
import { Container } from "../../styles";
import Global from "../../styles/global";

export default function PaginaDirigentes() {
    document.title = "Dirigentes"

    return (
        <Container>
            <ModalAddDirigente />
            <Menu />
            <Global />
        </Container>
    )
}