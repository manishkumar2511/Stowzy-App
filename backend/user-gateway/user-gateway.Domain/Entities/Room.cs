using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace user_gateway.Domain.Entities
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RoomId { get; set; }
        public required string BusinessName { get; set; }
        public required string BusinessType { get; set; }
        public required int NoOfRooms { get; set; }
        public required string RoomSize { get; set; }
        public required string SecurityMeasures { get; set; }
        public required decimal HourlyRentalPrice { get; set; }
        public required string StreetAddress { get; set; }
        public string? Landmark { get; set; }
        public required string Country { get; set; }
        public required string State { get; set; }
        public required string City { get; set; }
        public required string PostalCode { get; set; }
        public required string CurrentLocation { get; set; }

    }
}
