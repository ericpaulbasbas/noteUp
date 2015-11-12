using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace noteUp.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }
}