using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace user_gateway.Domain.Entities
{
    public class GuestUser
    {
        [Key]
        public Guid GuestUserId { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;
        public bool IsEmailProvided => !string.IsNullOrEmpty(Email);
        public bool IsPhoneNumberProvided => !string.IsNullOrEmpty(PhoneNumber);
    }
}
