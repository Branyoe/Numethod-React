import { Routes, Route, Navigate } from "react-router-dom";
import BisectionComponent from "../views/Bisection";
import FakeRuleComponent from "../views/FakeRule";
import Home from "../views/Home";
import IntegralesDefinidasComponent from "../views/IntegralesDefinidas";

export default function RoutesComponent() {

  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/regla-falsa" element={<FakeRuleComponent />} exact />
      <Route path="/biseccion" element={<BisectionComponent />} exact />
      <Route path="/integrales-definidas" element={<IntegralesDefinidasComponent/>} exact />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}