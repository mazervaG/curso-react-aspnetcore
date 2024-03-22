using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        [HttpGet]
        public Atividade Get()
        {
            return new Atividade();
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return $"Metodo GET com parâmetro {id}";
        }

        [HttpPost]
        public string Post()
        {
            return "Minha pica post é tortonaaaa";
        }

        [HttpPut]
        public string Put()
        {
            return "Minha pica put é tortonaaaa";
        }

        [HttpDelete]
        public string Delete()
        {
            return "Minha pica delete é tortonaaaa";
        }
    }
}