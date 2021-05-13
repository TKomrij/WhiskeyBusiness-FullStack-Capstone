using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhiskeyBusiness.Models;
using WhiskeyBusiness.Repositories;

namespace WhiskeyBusiness.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WhiskeyController : ControllerBase
    {
        private readonly IWhiskeyRepository _whiskeyRepository;
        public WhiskeyController(IWhiskeyRepository whiskeyRepository)
        {
            _whiskeyRepository = whiskeyRepository;
        }

        [HttpPost]
        public IActionResult Whiskey(Whiskey whiskey)
        {
            _whiskeyRepository.Add(whiskey);
            return CreatedAtAction("Get", new { id = whiskey.Id }, whiskey);
        }
    }
}
