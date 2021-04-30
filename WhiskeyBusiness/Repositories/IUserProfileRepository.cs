using WhiskeyBusiness.Models;

namespace WhiskeyBusiness.Repositories
{
    public interface IUserProfileRepository
    {
       // void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}