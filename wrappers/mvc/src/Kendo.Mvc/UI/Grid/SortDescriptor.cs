namespace Kendo.Mvc
{
    using System.ComponentModel;
    using System.Linq;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Represents declarative sorting.
    /// </summary>
    public class SortDescriptor : JsonObject, IDescriptor
    {
        /// <summary>
        /// Gets or sets the member name which will be used for sorting.
        /// </summary>
        /// <filterValue>The member that will be used for sorting.</filterValue>
        public string Member
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the sort direction for this sort descriptor. If the value is null
        /// no sorting will be applied.
        /// </summary>
        /// <value>The sort direction. The default value is null.</value>
        public ListSortDirection SortDirection
        {
            get;
            set;
        }

        public void Deserialize(string source)
        {
            var parts = source.Split(new [] { '-' });
            
            if (parts.Length > 1)
            {
                Member = parts[0];
            }

            var sortDirection = parts.Last();
            
            SortDirection = sortDirection == "desc" ? ListSortDirection.Descending : ListSortDirection.Ascending;
        }
        
        public string Serialize()
        {
            return "{0}-{1}".FormatWith(Member, SortDirection == ListSortDirection.Ascending ? "asc" : "desc");
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            json["field"] = Member;
            json["dir"] = SortDirection == ListSortDirection.Ascending ? "asc" : "desc";
        }
    }
}
