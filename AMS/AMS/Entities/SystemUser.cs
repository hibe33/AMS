using System;
using System.Collections.Generic;

namespace AMS.Entities
{
    public class SystemUser
    {
        public SystemUser()
        {
            RefereeArticles = new HashSet<RefereeArticle>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Mail { get; set; }
        public DateTime? CreateDate { get; set; }
        public string Role { get; set; }
        public string Pass { get; set; }
        public string Title { get; set; }

        public virtual ICollection<RefereeArticle> RefereeArticles { get; set; }
    }
}
