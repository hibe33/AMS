using System;
using System.Collections.Generic;

namespace AMS.Entities
{
    public class Article
    {
        public Article()
        {
            RefereeArticles = new HashSet<RefereeArticle>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string FileName { get; set; }
        public string AuthorFirstName { get; set; }
        public string AuthorLastName { get; set; }
        public string AuthorPhone { get; set; }
        public string AuthorMail { get; set; }
        public string AuthorNotes { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual ICollection<RefereeArticle> RefereeArticles { get; set; }
    }
}
