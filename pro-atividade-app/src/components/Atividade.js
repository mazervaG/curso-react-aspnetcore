import React from 'react'

export default function Atividade(props) {
  function prioridade(param) {
    switch(param) {
      case "1":
        return "Baixa";
      case "2":
        return "Normal";
      case "3":
        return "Alta";
      default:
        return "Não definido";
    }
  }

  function prioridadeIcon(param, icon) {
    switch(param) {
      case "1":
        return icon ? "smile" : "success";
      case "2":
        return icon ? "meh" : "dark"; 
      case "3":
        return icon ? "frown" : "danger"; 
      default:
        return "Não definido";
    }
  }
  return (
    <div className={"card mb-2 shadow border-" + prioridadeIcon(props.ativ.prioridade)}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">
              {props.ativ.id} 
            </span>
            - {props.ativ.titulo}
          </h5>
          <h6>
            Prioridade:
              <span className={"ms-1 text-" + prioridadeIcon(props.ativ.prioridade)}>
                <i className={"me-1 fa-regular fa-face-" + prioridadeIcon(props.ativ.prioridade, true)}></i>
                {prioridade(props.ativ.prioridade)}
              </span>
          </h6>
        </div>
          <p className="card-text">{props.ativ.descricao}</p>
            <div className="d-flex justify-content-end pt-2 border-top">
              <button className="btn btn-sm btn-outline-primary me-2"
              onClick={() => props.pegarAtividade(props.ativ.id)}>
                <i className="fas fa-pen me-2"></i>
                  Editar
              </button>
              <button className="btn btn-sm btn-outline-danger" 
                onClick={() => props.deletarAtividade(props.ativ.id)}>
                <i className="fas fa-trash me-2" ></i>
                  Deletar
              </button>
            </div>
        </div>
    </div>
  )
}
