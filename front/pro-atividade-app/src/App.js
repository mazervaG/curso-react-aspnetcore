import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';
import { Button, Modal } from 'react-bootstrap';


function App() {

  const [showAtividadeModal, setAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({id: 0})

  const handleAtividadeModal = () => 
    setAtividadeModal(!showAtividadeModal);

  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined) {
      const atividade = atividades.filter(
        (atividade) => atividade.id === id
      );
      setAtividade(atividade[0]);
    }
    else {
      setAtividade({id:0});
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  };

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();

      if(todasAtividades)
        setAtividades(todasAtividades);
    };

    getAtividades();
    
  },[])

  const novaAtividade = () => {
    setAtividade({id: 0})
    handleAtividadeModal();
  }

  const addAtividade = async (ativi) => {
    handleAtividadeModal();
    const response = await api.post('atividade', ativi)
    setAtividades([...atividades, response.data]
    );
  }

  const cancelarAtividade = () => {
    setAtividade({id: 0})
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativi) => {
    handleAtividadeModal();
    const response = await api.put(`atividade/${ativi.id}`, ativi)
    const { id } = response.data;
    setAtividades(
      atividades.map(item => item.id === id ? response.data : item)
    );
    setAtividade({id: 0})
  }

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if(await api.delete(`atividade/${id}`)){
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id
      );
      setAtividades([...atividadesFiltradas])
    }
  };

  const pegarAtividade = (id) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0" >Atividade {atividade.id !== 0 ? atividade.id : ""}</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>
      
      <AtividadeLista 
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        handleConfirmModal={handleConfirmModal}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativiSelecionada={atividade}
            atividades={atividades}
            handleAtividadeModal={handleAtividadeModal}
          />
        </Modal.Body>
      </Modal>

      <Modal show={smShowConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Excluindo Atividade {''}
            {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a atividade {atividade.id}
        </Modal.Body>
        <Modal.Footer>
          <button 
            className="btn btn-outline-success me-2" 
            onClick={() => deletarAtividade(atividade.id)}
          >
            <i className="fas fa-check me-2" ></i>
            Sim
          </button>
          <button 
            className="btn btn-danger me-2"
            onClick={() => handleConfirmModal(0)}
          >
            <i className="fas fa-times me-2" ></i>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
