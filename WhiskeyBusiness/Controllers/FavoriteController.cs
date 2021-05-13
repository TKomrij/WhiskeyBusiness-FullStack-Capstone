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
    public class FavoriteController : Controller
    {

        private readonly IFavoriteRepository _favoriteRepository;
        public FavoriteController(
            IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_favoriteRepository.GetAllFavorites());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var favorite = _favoriteRepository.GetFavoritedWhiskiesByUserProfileId(id);

            if (favorite == null)
            {
                return NotFound();
            }
            return Ok(_favoriteRepository.GetFavoritedWhiskiesByUserProfileId(id));

        }

        [HttpPost]
        public IActionResult Favorite(Favorite favorite)
        {
            _favoriteRepository.Add(favorite);
            return CreatedAtAction("Get", new { id = favorite.Id }, favorite);
        }

        [HttpGet("check/{userProfileId}/{whiskeyApiId}")]
        public IActionResult Get(int userProfileId, int whiskeyApiId)
        {
            return Ok(_favoriteRepository.FavoriteCheck(userProfileId, whiskeyApiId));
        }

    }
}
