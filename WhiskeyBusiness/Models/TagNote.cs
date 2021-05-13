using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhiskeyBusiness.Models
{
    public class TagNote
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public int NoteId { get; set; }
        public Tag tag { get; set; }
        public Note note { get; set; }
    }
}
