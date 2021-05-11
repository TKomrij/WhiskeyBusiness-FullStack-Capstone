using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WhiskeyBusiness.Models;
using WhiskeyBusiness.Repositories;
using WhiskeyBusiness.Utils;

namespace WhiskeyBusiness.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }


        public List<Favorite> GetAllFavorites()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT f.Id AS FavoriteId, f.UserProfileId, f.WhiskeyId AS FavoriteWhiskeyId, 
                w.Id AS WhiskeyId, w.Name AS WhiskeyName
                FROM Favorite f
                JOIN Whiskey w ON w.Id = f.WhiskeyId";

                    var reader = cmd.ExecuteReader();

                    var favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "FavoriteId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            WhiskeyId = DbUtils.GetInt(reader, "FavoriteWhiskeyId"),
                            whiskey = new Whiskey()
                            {
                                Id = DbUtils.GetInt(reader, "WhiskeyId"),
                                Name = DbUtils.GetString(reader, "WhiskeyName"),
                            }

                        });
                    }

                    reader.Close();

                    return favorites;
                }
            }
        }

        public void Add(Favorite favorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Favorite ( WhiskeyID, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@whiskeyId, @userProfileId);";

                    DbUtils.AddParameter(cmd, "@userProfileId", favorite.UserProfileId);
                    DbUtils.AddParameter(cmd, "@whiskeyId", favorite.WhiskeyId);


                    favorite.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public List<Favorite> GetFavoritedWhiskiesByUserProfileId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT f.Id AS FavoriteId, f.UserProfileId, f.WhiskeyId AS FavoriteWhiskeyId, 
                w.Id AS WhiskeyId, w.Name AS WhiskeyName
                FROM Favorite f
                JOIN Whiskey w ON w.Id = f.WhiskeyId
                WHERE f.UserProfileId = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "FavoriteId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            WhiskeyId = DbUtils.GetInt(reader, "FavoriteWhiskeyId"),
                            whiskey = new Whiskey()
                            {
                                Id = DbUtils.GetInt(reader, "WhiskeyId"),
                                Name = DbUtils.GetString(reader, "WhiskeyName"),
                            }

                        });
                    }

                    reader.Close();

                    return favorites;
                }
            }
        }

        public bool FavoriteCheck(int userProfileId, int whiskeyApiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM Favorite f
                        JOIN Whiskey w ON w.Id = f.WhiskeyId
                        WHERE f.UserProfileId = @userProfileId 
                        AND w.WhiskeyApiId = @whiskeyApiId";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    DbUtils.AddParameter(cmd, "@whiskeyApiId", whiskeyApiId);

                    var reader = cmd.ExecuteReader();

                    return reader.HasRows;
                }
            }
            
        }
    }
}
