using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhiskeyBusiness.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int WhiskeyId { get; set; }
        public Whiskey whiskey { get; set; }


    }
}
