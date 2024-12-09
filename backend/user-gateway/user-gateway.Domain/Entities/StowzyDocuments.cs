using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace user_gateway.Domain.Entities
{
    public class StowzyDocuments
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DocumentId { get; set; }
        public required string IdentityProofType { get; set; }
        public required IFormFile IdentityProofDocument { get; set; }
        public required List<IFormFile> StowzyImages { get; set; } = new List<IFormFile>();
    }
}
