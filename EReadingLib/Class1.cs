using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EReadingLib
{
    public class Class1
    {
    }

    public class Assessment
    {
        //public Assessment()
        //{
        //}
        public int Id { get; set; }
        public float Average { get; set; }
        public int AssessmentsCount { get; set; }
    }

    public class Book
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public int[] AutorId { get; set; }
        public string Caption { get; set; }
        public string Description { get; set; }
        public int[] GenreId { get; set; }
        public int SeriesID { get; set; }
        public int AssessmentId { get; set; }
        //public string Language { get; set; }
        public int PageCount { get; set; }
        public int Year { get; set; }
        public int BookStatisticId { get; set; }
        public DateTime UploadDate { get; set; }
    }

    //день неделя месяц год всеВремя
    public class BookStatistic {
        public int Id { get; set; }
        public int BookId { get; set; }

        public int ViewsCount { get; set; }
        public double AverageEstimate { get; set; }
        public int EstimateCount { get; set; }
        public int CommentsCount { get; set; }
        public int DownloadCount { get; set; }
    }
    public class Autor {
        public int Id { get; set; }
        public int BooksId { get; set; }
        public int SeriesId { get; set; }

        public int Photo { get; set; }

        public bool Gender { get; set; }
        public DateTime BirthDate { get; set; }

        public string Name { get; set; }
        public string HomePage { get; set; }
        public string Description { get; set; }
        //Домашняя страница: http://samlib.ru/b/bed_k/
    }
    public class AutorStatistic
    {
    }
    public class Genre {
    }
    public class Series {
    }
    public class Comment
    {
    }

    public class User
    {
    }
}
