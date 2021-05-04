using System;
using Microsoft.AspNetCore.Mvc;
using WhiskeyBusiness.Repositories;
using WhiskeyBusiness.Models;
using Microsoft.AspNetCore.Authorization;

namespace WhiskeyBusiness.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

       /* [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _userProfileRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post); 
        } */

        [HttpPost]
        public IActionResult UserProfile(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
        } 


        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(userProfile);
            return NoContent();
        }
    }
}
