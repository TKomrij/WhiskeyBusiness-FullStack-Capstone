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
    [Authorize]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ITagNoteRepository _tagNoteRepository;


        public NoteController(
            INoteRepository noteRepository,
            IUserProfileRepository userProfileRepository,
            ITagNoteRepository tagNoteRepository)
        {
            _noteRepository = noteRepository;
            _userProfileRepository = userProfileRepository;
            _tagNoteRepository = tagNoteRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_noteRepository.GetAllNotes());
        }



        [HttpPost]
        public IActionResult Post(Note note)
        {

            //string firebaseUserProfileId = GetCurrentFirebaseUserProfileId();
            //post.FirebaseUserId = firebaseUserProfileId;

            var currentUserProfile = GetCurrentUserProfile();
            note.UserProfileId = currentUserProfile.Id;

            _noteRepository.Add(note);
            return CreatedAtAction("Get", new { id = note.Id }, note);
        }



        [HttpPut("{id}")]
        public IActionResult Put(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            _noteRepository.Update(note);
            return Ok(_noteRepository.GetAllNotes());
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _noteRepository.Delete(id);
            return NoContent();
        }



        //[HttpDelete("{noteId}/{tagId}")]
        //public IActionResult Delete(int noteId, int tagId)
        //{
         //   _noteRepository.DeleteTag(noteId, tagId);
          //  return NoContent();
       // }


       // [HttpPut]
        //public IActionResult Put(Note note, Tag tag)
       // {
         //   _noteRepository.InsertTag(note, tag);
          //  return Ok(_noteRepository.GetAllNotes());
       // }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var note = _noteRepository.GetById(id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);

        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        
    }
}