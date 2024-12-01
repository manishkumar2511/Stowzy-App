using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace user_gateway.Domain.Entities
{
    public class RoomOwner
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RoomOwnerId { get; set; }

        public IFormFile? ProfileImage { get; set; }

        public required string Title { get; set; }

        public required string FirstName { get; set; }

        public string? LastName { get; set; }

        public required DateTime DateOfBirth { get; set; }

        public required string Gender { get; set; }

        public long PhoneNumber { get; set; }

        public long? SecondaryNumber { get; set; }

        public required string Email { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime ModifiedDate { get; set; }

        public bool IsDeleted { get; set; }

        public required string StreetAddress { get; set; }

        public string? Landmark { get; set; }

        public required string Country { get; set; }

        public required string State { get; set; }

        public required string City { get; set; }

        public required int PostalCode { get; set; }

        public required string Password { get; set; }

        public string? Role { get; set; }
    }
}
