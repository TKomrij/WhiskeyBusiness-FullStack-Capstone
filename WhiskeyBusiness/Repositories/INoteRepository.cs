﻿using System.Collections.Generic;
using WhiskeyBusiness.Models;

namespace WhiskeyBusiness.Repositories
{
    public interface INoteRepository
    {
        List<Note> GetAllNotes();
        Note GetById(int id);
        void Add(Note note);
        void Delete(int id);
        void Update(Note note);
    }
}