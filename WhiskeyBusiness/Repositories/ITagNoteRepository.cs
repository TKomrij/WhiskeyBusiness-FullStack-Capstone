using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhiskeyBusiness.Models;

namespace WhiskeyBusiness.Repositories
{
    public interface ITagNoteRepository
    {
        List<TagNote> GetAllTagNotes();
        void Add(TagNote tagNote);
    }
}
