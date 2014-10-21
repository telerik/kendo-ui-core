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

        public static IEnumerable<IGridColumn> ColumnParents(this IEnumerable<IGridColumn> columns, IGridColumn column)
        {
            return columns.ColumnParentsAndSelf(column).Where(c => c != column);
        }

        public static IEnumerable<IGridColumn> ColumnParentsAndSelf(this IEnumerable<IGridColumn> columns, IGridColumn column)
        {
            var parents = new List<IGridColumn>();

            if (columns.Any(c => c == column))
            {
                parents.Add(column);

                return parents;
            }

            foreach (var c in columns.OfType<IGridColumnGroup>())
            {
                var result = c.Columns.ColumnParentsAndSelf(column);
                if (result.Any())
                {
                    parents.Add(c);
                    parents = parents.Concat(result).ToList();
                    break;
                }
            }

            return parents;
        }

        public static int ColumnLevel(this IEnumerable<IGridColumn> columns, IGridColumn column)
        {
            columns = columns.Where(c => c.Visible);

            if (!columns.Any())
            {
                return 0;
            }

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
            columns = columns.Where(c => c.Visible);

            if (!columns.Any())
            {
                return 0;
            }

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