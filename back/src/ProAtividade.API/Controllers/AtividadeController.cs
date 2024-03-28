using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {

        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{Id}")]
        public Atividade Get(int Id)
        {
            return _context.Atividades.FirstOrDefault(ativ => ativ.Id == Id);
        }

        [HttpPost]
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);

            if(_context.SaveChanges() > 0)
                return _context.Atividades;
            else
                throw new Exception("erro ao adicionar atividade");
        }

        [HttpPut("{Id}")]
        public Atividade Put(int Id, Atividade atividade)
        {
            if(atividade.Id != Id)
                throw new Exception("Você esta tentando atualizar a atividade errada");
            
            _context.Update(atividade);

            if(_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == Id);
            else
                return new Atividade();
        }

        [HttpDelete("{Id}")]
        public bool Delete(int Id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ativ => ativ.Id == Id);
            if(atividade == null)
                throw new Exception("Você esta tentando deletar uma atividade que não existe");
            
            _context.Remove(atividade);

            return _context.SaveChanges() > 0;
        }
    }
}