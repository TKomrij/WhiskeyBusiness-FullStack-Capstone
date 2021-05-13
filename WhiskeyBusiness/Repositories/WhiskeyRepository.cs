using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WhiskeyBusiness.Models;
using WhiskeyBusiness.Repositories;
using WhiskeyBusiness.Utils;

namespace WhiskeyBusiness.Repositories
{
    public class WhiskeyRepository : BaseRepository, IWhiskeyRepository
        {
        public WhiskeyRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Whiskey whiskey)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO Whiskey (WhiskeyApiId, Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@WhiskeyApiId, @Name)";
                        DbUtils.AddParameter(cmd, "@FirebaseUserId", whiskey.WhiskeyApiId);
                        DbUtils.AddParameter(cmd, "@Name", whiskey.Name);

                        whiskey.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }

        }
    }

