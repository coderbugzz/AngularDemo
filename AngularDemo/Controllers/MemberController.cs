using AngularDemo.Models;
using AngularDemo.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IRepository _repository;

        public MemberController(IRepository repository)
        {
            _repository = repository;
        }
        // GET: api/<DataController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<member>>> MemberList()
        {
            return await _repository.SelectAll<member>();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<member>> GetMember(long id)
        {
            var model = await _repository.SelectById<member>(id);

            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(long id, member model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            await _repository.UpdateAsync<member>(model);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<member>> InsertMember([FromBody]member model)
        {
            await _repository.CreateAsync<member>(model);
            return CreatedAtAction("GetMember", new { id = model.Id }, model);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<member>> DeleteMember(long id)
        {
            var model = await _repository.SelectById<member>(id);

            if (model == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<member>(model);

            return model;
        }
    }
}
