import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const InstituicaoEnsino = () => {
  let [instituicoesEnsino, setInstituicoesEnsino] = useState([]);

  const listarInstituicoesEnsino = () => {
    console.log('Listando as IEs');

    fetch('http://localhost:5000/instituicoesensino')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setInstituicoesEnsino([...data]);
      })
      .catch((error) => {
        console.log('Erro na requisição da API.');
      });
  };

  useEffect(() => {
    listarInstituicoesEnsino();
  }, []);

  const buscarHandleClick = (event) => {};

  const handleClickAdicionarIE = (event) => {
    console.log('Adionando uma IE');
    let instituicaoEnsino = { nome: 'IFPB - Campina Grande' };
    // instituicoesEnsino.push(instituicaoEnsino);
    setInstituicoesEnsino([...instituicoesEnsino, instituicaoEnsino]);
  };

  const removerHandleClick = (id) => {
    if (!window.confirm('Deseja realmente remover esta Instituição de Ensino?')) {
      return;
    }

    if (id === undefined) {
      setInstituicoesEnsino(
        instituicoesEnsino.filter((ie) => ie.id !== undefined)
      );
      return;
    }

    fetch(`http://localhost:5000/instituicoesensino/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        setInstituicoesEnsino((anteriores) =>
          anteriores.filter((ie) => ie.id !== id)
        );
      })
      .catch((error) => {
        console.log('Erro ao remover a IE.', error);
      });
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {instituicoesEnsino.map((instituicaoEnsino, i) => {
            return (
              <tr key={instituicaoEnsino.id ?? `local-${i}`}>
                <td>{i + 1}</td>
                <td>{instituicaoEnsino.no_entidade}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Remover</Tooltip>}
                  >
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removerHandleClick(instituicaoEnsino.id)}
                    >
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default InstituicaoEnsino;