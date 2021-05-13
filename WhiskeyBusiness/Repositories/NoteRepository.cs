using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhiskeyBusiness.Models;
using WhiskeyBusiness.Utils;

namespace WhiskeyBusiness.Repositories
{
    public class NoteRepository : BaseRepository, INoteRepository
    {
        public NoteRepository(IConfiguration configuration) : base(configuration) { }


        public List<Note> GetAllNotes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT n.Id , n.UserProfileId, n.WhiskeyId, n.Description
                                        FROM Note n
                                        ORDER BY n.Id DESC";

                    var reader = cmd.ExecuteReader();
                    var notes = new List<Note>();
                    while (reader.Read())
                    {
                        notes.Add(new Note()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            WhiskeyId = DbUtils.GetInt(reader, "WhiskeyId"),
                            Description = DbUtils.GetString(reader, "Description")
                        });
                    }
                    reader.Close();
                    return notes;
                }
            }
        }

        public Note GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, UserProfileId, WhiskeyId, Description
                                        FROM Note
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Note note = null;
                    while (reader.Read())
                    {
                        note = new Note()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            WhiskeyId = DbUtils.GetInt(reader, "WhiskeyId"),
                            Description = DbUtils.GetString(reader, "Description"),
                        };
                    }
                    reader.Close();
                    return note;
                }
            }
        }

        public void Add(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Note (Description, WhiskeyID, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@description, @whiskeyId, @userProfileId);";

                    DbUtils.AddParameter(cmd, "@description", note.Description);
                    DbUtils.AddParameter(cmd, "@userProfileId", note.UserProfileId);
                    DbUtils.AddParameter(cmd, "@whiskeyId", note.WhiskeyId);


                    note.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Note
                           SET Description = @description
                         WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@description", note.Description);
                    DbUtils.AddParameter(cmd, "@id", note.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM TagNote
                            WHERE NoteId = @id;
                        DELETE FROM Note
                              WHERE Id = @id 
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void InsertTag(Note note, Tag tag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO TagNote(NoteId, TagId)
                                                       VALUES (@noteId, @tagId)";
                    cmd.Parameters.AddWithValue("@postId", note.Id);
                    cmd.Parameters.AddWithValue("@tagId", tag.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteTag(int noteId, int tagId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM TagNote 
                                         WHERE NoteId = @noteId AND 
                                               TagId = @tagId";
                    cmd.Parameters.AddWithValue("@noteId", noteId);
                    cmd.Parameters.AddWithValue("@tagId", tagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }

}
