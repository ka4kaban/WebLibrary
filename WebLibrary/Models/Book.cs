using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace WebLibrary.Models
{
    public class Assessment
    {
        public Assessment()
        {
        }
        public float Average { get; set; }
        public int AssessmentsCount { get; set; }
    }

    public class Book
    {
        public string ImageUrl { get; set; }
        public int BookId { get; set; }
        public string Autor { get; set; }
        public string Caption { get; set; }
        public string Description { get; set; }
        public string[] Genre { get; set; }
        public string Series { get; set; }
        public Assessment Assessment { get; set; }
        public string Language { get; set; }
        public int PageCount { get; set; }
        public int Year { get; set; }
        public int CommentCount { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
