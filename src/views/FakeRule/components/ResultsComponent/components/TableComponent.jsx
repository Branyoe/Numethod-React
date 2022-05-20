import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import useFakeRuleStore from '../../../../../stores/FakeRuleStore';
import shallow from "zustand/shallow"
import IterationDialog from './IterationDialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(iteracion, xLow, fxLow, xUp, fxUp, aproxError, xRes, fxRes) {
  return { iteracion, xLow,fxLow, xUp, fxUp, aproxError, xRes, fxRes };
}

let rows = [];

export default function TableComponent({ setIterationsOnFather, container }) {

  const { responseFakeRule, isLoading } = useFakeRuleStore(state => ({
    responseFakeRule: state.responseFakeRule,
    isLoading: state.isLoading
  }), shallow);

  if (isLoading === false) {
    rows = [];
    if (Array.isArray(responseFakeRule)) {
      responseFakeRule?.map((v, i) => {
        rows.push(createData(
          i,
          v.xLow,
          v.fxUp,
          v.xUp,
          v.fxUp,
          v.approxError,
          v.xRes,
          v.fxRes
        ));
        return null;
      })
    }

    if (setIterationsOnFather) {
      setIterationsOnFather(rows.length);
    }
  }

  return (
    <TableContainer maxHeight="100%" component={container}>
      <Table stickyHeader aria-label="stiky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Iteración</StyledTableCell>
            <StyledTableCell align="right">xLow</StyledTableCell>
            <StyledTableCell align="right">fxLow</StyledTableCell>
            <StyledTableCell align="right">xUp</StyledTableCell>
            <StyledTableCell align="right">fxUp</StyledTableCell>
            <StyledTableCell align="right">Error Aproximado</StyledTableCell>
            <StyledTableCell align="right">xRes</StyledTableCell>
            <StyledTableCell align="right">fxRes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <IterationDialog key={i} iterationData={responseFakeRule[i]} indice={i}>
              <StyledTableCell component="th" scope="row">
                {row.iteracion}
              </StyledTableCell>
              <StyledTableCell align="right">{row.xLow}</StyledTableCell>
              <StyledTableCell align="right">{row.fxLow}</StyledTableCell>
              <StyledTableCell align="right">{row.xUp}</StyledTableCell>
              <StyledTableCell align="right">{row.fxUp}</StyledTableCell>
              <StyledTableCell align="right">{row.aproxError}</StyledTableCell>
              <StyledTableCell align="right">{row.xRes}</StyledTableCell>
              <StyledTableCell align="right">{row.fxRes}</StyledTableCell>
            </IterationDialog>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
