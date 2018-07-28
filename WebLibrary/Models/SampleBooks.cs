using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace WebLibrary.Models
{
    public class Example
    {
        static Example() {
            PopulateBookPaths(); 
        }
        public static void PopulateBookPaths()
        {
            Paths.Add(new KeyValuePair<int, String>(0, "Pehov_gorn.txt"));
            Paths.Add(new KeyValuePair<int, String>(1, "Labirint_otrachenii.txt"));
            Paths.Add(new KeyValuePair<int, String>(2, "Zykov_Vitalii_Pod_znamenem_prorochestva.txt"));
            Paths.Add(new KeyValuePair<int, String>(3, "Panov_Vadim__Komandor_voiny.txt"));
            Paths.Add(new KeyValuePair<int, String>(4, "Zykov_Vitalii_Vladyka_Sarduora.txt"));
            Paths.Add(new KeyValuePair<int, String>(5, "Maikl_Morpurgo_Malchik_iz_dchunglei.txt"));
            Paths.Add(new KeyValuePair<int, String>(6, "Futbol.txt"));
            Paths.Add(new KeyValuePair<int, String>(7, "Anderson_DUNA.txt"));
        }
        static ICollection<KeyValuePair<int, String>> Paths = new Dictionary<int, String>();
        
        public static string GetPathByBookId(int bookId)
        {
            return @"./Content/books/" + Paths.Where(t => t.Key == bookId).Select(t => t.Value).FirstOrDefault();
        }
        public static Book[] SampleBooks = new[]
    {
         new Book() {
            ImageUrl= "/Content/proclitiyGorn.jpg",
            BookId= 0,
            Autor= "Пехов Алексей Юрьевич",
            Caption= "Проклятый горн",
            Description= "Горячий ветер стремительно рвется с юга, прогоняя суровую зиму и принося на крыльях черную смерть. Загадочный темный кузнец разжег в своем горне пламя Судного дня, зловещие тени собираются в школе стражей, и не за горами время могил. Людвиг, Гертруда, ...",
            Genre = new string[] {"Фентези", "Боевая фантастика" },
            Series= "Страж",
            Assessment= new Assessment{
                Average =  9.6f,
                AssessmentsCount =  115
            },
            Language= "русский",
            PageCount= 25,
            Year= 2014,
            CommentCount = 23,
            UploadDate =  new DateTime(2018,07,21)
         },
                  new Book() {
             ImageUrl= "/Content/labirintOtrageniy.jpg",
             BookId= 1,
             Autor= "Лукьяненко Сергей Васильевич",
             Caption= "Лабиринт отражений",
             Description= "Еще несколько лет назад виртуальный мир был выдумкой фантастов… Еще совсем недавно даже в горячечном бреду никто не спутал бы иллюзию с реальностью… Но теперь виртуальный мир вполне реален. В нем есть свои преступники и защитники закона. В нем существуют ...",
             Genre= new string[] {"Научная фантастика", "Боевая фантастика"},
             Series= "Диптаун",
             Assessment= new Assessment{
                 Average= 9.59f,
                 AssessmentsCount= 252
             },
             Language= "русский",
             PageCount= 19,
             Year= 2006,
            CommentCount = 27,
            UploadDate =  new DateTime(2018,07,21)
         },
         new Book()
    {
        ImageUrl= "/Content/prorochestvo.jpg",
             BookId= 2,
             Autor= "Зыков Виталий Валерьевич",
             Caption= "Под знаменем пророчества",
             Description= "Власть над Торном манит многих. Выходят из лесов Светлые и Темные эльфы, бороздят воздушные океаны флотилии Нолда, а некроманты Тлантоса взывают к Тьме… Наступает смутное время, и вот уже звенят клинки в подземных городах гномов, а демоны Бездны штурмуют ...",
             Genre= new string[] {"Фэнтези", "Боевая фантастика"},
             Series= "Дорога домой",
             Assessment= new Assessment{
                 Average= 9.56f,
                 AssessmentsCount= 366
             },
             Language= "русский",
             PageCount= 28,
             Year= 2013,
            CommentCount = 34,
            UploadDate =  new DateTime(2018,07,24)
         },
         new Book()
    {
        ImageUrl= "/Content/komandorVoiny.jpg",
             BookId= 3,
             Autor= "Панов Вадим Юрьевич",
             Caption= "Командор войны",
             Description= "Оказывается, человечество – отнюдь не единственная разумная раса на нашей планете. Потомки давно исчезнувших цивилизаций и сейчас обитают в магическом Тайном Городе, многие тысячи лет существующем на территории Москвы и сокрытом от глаз людей защитными ...",
             Genre= new string[] {"Боевая фантастика"},
             Series= "Тайный город",
             Assessment= new Assessment{
                 Average= 9.52f,
                 AssessmentsCount= 92
             },
             Language= "русский",
             PageCount= 18,
             Year= 2008,
            CommentCount = 11,
            UploadDate =  new DateTime(2018,07,22)
         },
         new Book()
    {
        ImageUrl= "/Content/vladicaSarduora.jpg",
             BookId= 4,
             Autor= "Зыков Виталий Валерьевич",
             Caption= "Владыка Сардуора",
             Description= "Суров и жесток Торн. Когда разрываются старые договора, нарушаются древние законы, а недавние союзники становятся врагами, нет места для жалости. Пламя новой войны поднимается над миром... Страшное время, но если хочешь не просто выжить, а стать кем-то ...",
             Genre= new string[] {"Фэнтези", "Боевая фантастика"},
             Series= "Дорога домой",
             Assessment= new Assessment{
                 Average= 9.51f,
                 AssessmentsCount= 291
             },
             Language= "русский",
             PageCount= 25,
             Year= 2009,
            CommentCount = 43,
            UploadDate =  new DateTime(2018,07,24)
         },
         new Book()
    {
        ImageUrl= "/Content/jungleBoy.jpg",
             BookId= 5,
             Autor= "Морпурго Майкл",
             Caption= "Мальчик из джунглей",
             Description= "«Мальчик из джунглей» – история удивительного спасения. Вернее, это история множества спасений, состоявшихся благодаря стойкости, решимости и доброте. Девятилетний Уилл, недавно потерявший отца, погибшего в Ираке, приезжает с матерью в Индонезию. Как раз накануне катастрофического наводнения 2004 года. В этой трагедии Уилл теряет мать, а сам остаётся в живых только благодаря слонихе по имени Уна, на которой мальчик катался, когда на побережье обрушилось цунами.",
             Genre= new string[] {"Проза"},
             Series= "",
             Assessment= new Assessment(),
             Language= "русский",
             PageCount= 10,
             Year= 0,
            CommentCount = 2,
            UploadDate =  new DateTime(2018,07,25)

         },
        new Book()
    {
        ImageUrl= "/Content/futbool.jpg",
             BookId= 6,
             Autor= "Яременко Николай Николаевич",
             Caption= "Футбол: откровенная история того, что происходит на самом деле",
             Description= "Последние два года стали поворотными в мировом и российском футболе= скандалы сотрясали одного из монстров мирового спортивного движения – ФИФА и его российский аналог – РФС, в отставку уходили их лидеры – Зепп Блаттер и Николай Толстых. И всё это на фоне более мелких скандалов с пресловутым финансовым фейер-плей и конфузов с неоправданным усилением «лимита» на легионеров.",
             Genre= new string[] {"Публицистика" },
             Series= "",
             Assessment= new Assessment(),
             Language= "русский",
             PageCount= 15,
             Year= 0,
            CommentCount = 1,
            UploadDate =  new DateTime(2018,07,26)
         },
         new Book()
    {
        ImageUrl= "/Content/duna.jpg",
             BookId= 7,
             Autor= "Андерсон Кевин Джей",
             Caption= "Дюна",
             Description= "Арракис. Пустынная планета ужасных бурь и гигантских песчаных червей. Планета, населенная жестокими фанатиками – фрименами. Планета, называемая также Дюной. Владение Арракисом сулит золотые горы, потому что эта планета – единственный во всей Вселенной источник Пряности, важнейшей субстанции в Империи. Исчезнет Пряность и любые межпланетные коммуникации прекратятся навсегда, а миллиарды людей, употреблявших этот наркотик умрут.",
             Genre= new string[] {"Эпическая фантастика" },
             Series= "Хроники Дюны",
             Assessment= new Assessment{
                 Average= 9.59f,
                 AssessmentsCount= 102
             },
             Language= "русский",
             PageCount= 40,
             Year= 2000,
            CommentCount = 14,
            UploadDate =  new DateTime(2018,07,27)

         }
    };
    }

}
