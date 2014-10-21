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

        public static int ColumnLevel(this IEnumerable<IGridColumn> columns, IGridColumn column)
        {
            var counter = 1;

            if (columns.Any(c => c == column))
            {
                return counter;
            }

            var children = columns.SelectMany(GetChildColumnsForLevel);
            if (children.Any())
            {
                return counter += children.ColumnLevel(column);
            }

            return counter;
        }

        public static IEnumerable<IGridColumn> FlatColumns(this IEnumerable<IGridColumn> columns)
        {
            return columns.SelectRecursive(GetChildColumns);
        }

        public static IEnumerable<IGridColumn> LeafColumns(this IEnumerable<IGridColumn> columns)
        {
            return columns.SelectRecursive(GetChildColumns).Where(c => !(c is IGridColumnGroup));
        }

        private static IEnumerable<IGridColumn> GetChildColumns(IGridColumn column)
        {
            if (column is IGridColumnGroup)
            {
                return ((IGridColumnGroup)column).Columns;
            }
            return null;
        }

        public static int HeaderRowsCount(this IEnumerable<IGridColumn> columns)
        {
            var counter = 1;

            var children = columns.SelectMany(GetChildColumnsForLevel);
            if (children.Any())
            {
                return counter += children.HeaderRowsCount();
            }

            return counter;
        }

        private static IEnumerable<IGridColumn> GetChildColumnsForLevel(IGridColumn column)
        {
            if (column is IGridColumnGroup)
            {
                return ((IGridColumnGroup)column).Columns;
            }
            return new IGridColumn[0];
        }
    }
}