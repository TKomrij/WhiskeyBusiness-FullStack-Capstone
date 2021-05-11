using System.Collections.Generic;
using WhiskeyBusiness.Models;

namespace WhiskeyBusiness.Repositories
{
    public interface IFavoriteRepository
    {
        List<Favorite> GetAllFavorites();
        void Add(Favorite favorite);
        List<Favorite> GetFavoritedWhiskiesByUserProfileId(int id);
        bool FavoriteCheck(int userProfileId, int whiskeyApiId);
    }
}