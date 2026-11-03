import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const InstituicaoEnsino = () => {
  let [instituicoesEnsino, setInstituicoesEnsino] = useState([
    { nome: 'IFPB - Guarabira' },
    { nome: 'IFPB - Cajazeiras' },
  ]);

  const buscarHandleClick = (event) => {};

  const handleClickAdicionarIE = (event) => {
    console.log('Adionando uma IE');
    let instituicaoEnsino = { nome: 'IFPB - Campina Grande' };
    // instituicoesEnsino.push(instituicaoEnsino);
    setInstituicoesEnsino([...instituicoesEnsino, instituicaoEnsino]);
  };
  return (
    <>
      <Row className="pt-4">
        <Col xs="10" lg="10">
          <Form.Control type="text" placeholder="Busca" />
        </Col>
        <Col xs="2" lg="2" className="d-flex gap-2">
          <OverlayTrigger placement="top" overlay={<Tooltip>Buscar</Tooltip>}>
            <Button onClick={buscarHandleClick}>
              <FaMagnifyingGlass />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Adicionar</Tooltip>}
          >
            <Button onClick={handleClickAdicionarIE}>
              <FaPlus />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {instituicoesEnsino.map((instituicaoEnsino, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{instituicaoEnsino.nome}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default InstituicaoEnsino;
