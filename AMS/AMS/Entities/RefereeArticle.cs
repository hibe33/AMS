using System;
using System.Collections.Generic;

#nullable disable

namespace AMS.Entities
{
    public partial class RefereeArticle
    {
        public int ArticleId { get; set; }
        public int RefereeId { get; set; }
        public string Comment { get; set; }
        public int? Score { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string State { get; set; }

        public virtual Article Article { get; set; }
        public virtual SystemUser Referee { get; set; }
    }
}
