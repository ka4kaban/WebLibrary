using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebLibrary.Models;
using System.IO;
using System.Text;
using System.Net.Http;

namespace WebLibrary.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]")]
        public BookText GetBookTextByID(int bookId)
        {
            string path = Example.GetPathByBookId(bookId);
            string bookText = System.IO.File.ReadAllText(path);
            return new BookText() { Text = bookText };
        }
        public class BookText
        {
            public string Text { get; set; }
        }

        [HttpGet("[action]")]
        public IEnumerable<Book> CarouselBooks()
        {
            return Example.SampleBooks;
        }

        IEnumerable<Book> SortBooks(IEnumerable<Book> baseDict, BooksFilter filterObj)
        {
            IEnumerable<Book> result = baseDict;
            if (!string.IsNullOrEmpty(filterObj.CaptionAutor))
            {
                result = result.Where(
                    t =>
                    t.Caption.ToLower().Contains(filterObj.CaptionAutor.ToLower())
                    || t.Autor.ToLower().Contains(filterObj.CaptionAutor.ToLower())
                );
            }

            if (!string.IsNullOrEmpty(filterObj.Genre))
            {
                result = result.Where(t => t.Genre.Contains(filterObj.Genre));
            }

            if (!string.IsNullOrEmpty(filterObj.Language))
            {
                result = result.Where(t => t.Language.ToLower().Contains(filterObj.Language.ToLower()));
            }

            if (filterObj.MinPageCount > 0)
            {
                result = result.Where(t => t.PageCount > filterObj.MinPageCount);
            }

            if (filterObj.MaxPageCount > 0)
            {
                result = result.Where(t => t.PageCount <= filterObj.MaxPageCount);
            }

            if (filterObj.MinYear > 0)
            {
                result = result.Where(t => t.Year > filterObj.MinYear);
            }

            if (filterObj.MaxYear > 0)
            {
                result = result.Where(t => t.Year <= filterObj.MaxYear);
            }

            return result;
        }
        [HttpGet("[action]")]
        public IEnumerable<Book> Books(string filter)
        {
            BooksFilter filterObj;
            if (String.IsNullOrEmpty(filter))
                return Example.SampleBooks;
            try
            {
                filterObj = JsonConvert.DeserializeObject<BooksFilter>(filter);
            }
            catch
            {
                return Example.SampleBooks;
            }
            return SortBooks(Example.SampleBooks, filterObj);
        }
        [HttpPost("[action]")]
        public void AddBook([FromBody] CreateUserViewModel m)
        {
            //string book1 = book;
            //var users = GetData(selectedRole).Select(p => new {
            //    FirstName = p.FirstName,
            //    LastName = p.LastName,
            //    Role = Enum.GetName(typeof(Role), p.Role)
            //});
        }
        public class CreateUserViewModel
        {
            public int Id { set; get; }
            public string Name { set; get; }
            public List<TagViewModel> Tags { set; get; }
        }
        public class TagViewModel
        {
            public int Id { set; get; }
            public string Code { set; get; }
        }
        public class Customer
        {
            public string contact_name;
            public string company_name;
        }
        //[HttpPost("[action]")]
        //public void AddBook() {

        //    //var users = GetData(selectedRole).Select(p => new {
        //    //    FirstName = p.FirstName,
        //    //    LastName = p.LastName,
        //    //    Role = Enum.GetName(typeof(Role), p.Role)
        //    //});
        //}

        public class BooksFilter
        {
            [JsonProperty("captionAutor")]
            public string CaptionAutor { get; set; }
            [JsonProperty("genre")]
            public string Genre { get; set; }
            [JsonProperty("language")]
            public string Language { get; set; }
            [JsonProperty("minPageCount")]
            public int MinPageCount { get; set; }
            [JsonProperty("maxPageCount")]
            public int MaxPageCount { get; set; }
            [JsonProperty("minYear")]
            public int MinYear { get; set; }
            [JsonProperty("maxYear")]
            public int MaxYear { get; set; }
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
