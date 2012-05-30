namespace Kendo.Mvc.Extensions
{
    using System.ComponentModel;
    
    public static class ListSortDirectionExtensions
    {
        public static ListSortDirection? Next(this ListSortDirection? direction)
        {
            if (direction == ListSortDirection.Ascending)
            {
                return ListSortDirection.Descending;
            }

            if (direction == ListSortDirection.Descending)
            {
                return null;
            }

            return ListSortDirection.Ascending;
        }
    }
}
