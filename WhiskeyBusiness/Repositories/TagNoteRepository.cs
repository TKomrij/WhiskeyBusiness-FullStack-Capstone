using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhiskeyBusiness.Models;
using WhiskeyBusiness.Utils;

namespace WhiskeyBusiness.Repositories
{
    public class TagNoteRepository : BaseRepository, ITagNoteRepository
    {
        public TagNoteRepository(IConfiguration configuration) : base(configuration) { }

        public List<TagNote> GetAllTagNotes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT tn.Id AS TagNoteId, tn.TagId AS TagNoteTagId, tn.NoteId AS TagNoteNoteId,
                                        t.Name, t.Id AS TagId
                                        n.Id , n.UserProfileId, n.WhiskeyId, n.Description,
                                        FROM TagNote tn
                                        JOIN Note n ON n.Id = tn.TagNoteNoteId
                                        JOIN Tag t ON t.Id = tn.TagId
                                        ORDER BY n.Id DESC";

                    var reader = cmd.ExecuteReader();
                    var tagNotes = new List<TagNote>();
                    while (reader.Read())
                    {
                        tagNotes.Add(new TagNote()
                        {
                            Id = DbUtils.GetInt(reader, "TagNoteId"),
                            TagId = DbUtils.GetInt(reader, "TagNoteTagId"),
                            NoteId = DbUtils.GetInt(reader, "TagNoteNoteId"),
                            tag = new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            },
                            note = new Note()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                WhiskeyId = DbUtils.GetInt(reader, "WhiskeyId"),
                                Description = DbUtils.GetString(reader, "Description"),
                                // tagNote = new TagNote()
                            }
                        });
                    }
                    reader.Close();
                    return tagNotes;
                }
            }
        }

        public void Add(TagNote tagNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO TagNote (TagId, NoteId)
                        OUTPUT INSERTED.ID
                        VALUES ( @tagId, @noteId);";

                   
                    DbUtils.AddParameter(cmd, "@tagId", tagNote.TagId);
                    DbUtils.AddParameter(cmd, "@noteId", tagNote.NoteId);


                    tagNote.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
