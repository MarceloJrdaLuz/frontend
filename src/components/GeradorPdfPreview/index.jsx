import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { ContainerPdf } from './styles';
import loading from './Icons/loadin.gif';
import { BotaoVoltar, SetaDireita, SetaEsquerda } from './Icons/icons';

export default function GeradorPdf({ ...props }) {

    const [numPages, setNumPages] = useState(null)
    const [numberPage, setNumberPage] = useState(1)
    const ultimaPagina = numPages
    const primeiraPagina = numPages - numPages + 1


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    function renderizarBotoes() {
        return (
            <>
                <button className='btnProximo' onClick={() => numberPage < numPages ? setNumberPage(numberPage + 1) : setNumberPage(primeiraPagina)}>{SetaDireita}</button>

                <button className='btnAnterior' onClick={() => numberPage > 1 ? setNumberPage(numberPage - 1) : setNumberPage(ultimaPagina)}>{SetaEsquerda}</button>

                <div className='voltar' onClick={() => props.onChangePdf('false')}>{BotaoVoltar}</div>
            </>
        )
    }

    return (
        <ContainerPdf>
            <Document
                file={`https://marceloupload.s3.sa-east-1.amazonaws.com/-${props.item}`}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<img src={loading} alt='Gif carregamento'></img>}
            >
                <Page
                    height={700}
                    pageNumber={numberPage}
                    rotate={props.rotate}
                />
            </Document>
            {renderizarBotoes()}
        </ContainerPdf>
    )
}