using System.ComponentModel.DataAnnotations;


namespace WhiskeyBusiness.Models
{
    public class Note
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public int WhiskeyId { get; set; }

        [Required]
        public string Description { get; set; }

        // public TagNote tagNote { get; set; }
    }
}
