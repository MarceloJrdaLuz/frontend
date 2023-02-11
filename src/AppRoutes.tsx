import React from "react";
import { Route, Routes } from "react-router-dom";
import PaginaDesignacoes from "./pages/PaginaDesignacoes";
import PaginaDirigentes from "./pages/PaginaDirigentes";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<PaginaDesignacoes/>}/>
            <Route path="/dirigentes" element={<PaginaDirigentes/>}/>
        </Routes>
    )
}