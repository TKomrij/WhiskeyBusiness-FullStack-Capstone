using System.Collections.Generic;
using WhiskeyBusiness.Models;

namespace WhiskeyBusiness.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int id);
        List<Tag> GetAllTags();
        Tag GetTagById(int id);
        void Update(Tag tag);
    }
}