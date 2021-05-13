using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WhiskeyBusiness.Models;
using WhiskeyBusiness.Repositories;

namespace WhiskeyBusiness.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TagNoteController : ControllerBase
    {
        private readonly ITagNoteRepository _tagNoteRepository;

        public TagNoteController(ITagNoteRepository tagNoteRepository)
        {
            _tagNoteRepository = tagNoteRepository;
        }

        // https://localhost:5001/api/tag
        [HttpPost]
        public IActionResult Create(TagNote tagNote)
        {
            _tagNoteRepository.Add(tagNote);
            return CreatedAtAction("Get", new { id = tagNote.Id }, tagNote);
        }
    }
}
