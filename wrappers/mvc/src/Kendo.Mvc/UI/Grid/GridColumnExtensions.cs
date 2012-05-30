namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Extensions;

    static class GridColumnExtensions
    {
        public static string GroupTitleForMember(this IEnumerable<IGridColumn> columns, string memberName)
        {
            var column = columns.OfType<IGridBoundColumn>().FirstOrDefault(c => c.Member == memberName);
            if (column != null)
            {
                return !column.Title.HasValue() ? column.Member.AsTitle() : column.Title;
            }

            return memberName.AsTitle();
        }
    }
}