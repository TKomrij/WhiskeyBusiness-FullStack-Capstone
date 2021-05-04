using System.Collections.Generic;
using WhiskeyBusiness.Models;

namespace WhiskeyBusiness.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
    }
}