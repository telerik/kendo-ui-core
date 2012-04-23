// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using Telerik.Web.Mvc.Infrastructure;

    internal class GridDataTableWrapper : IEnumerable<DataRowView>
    {
        internal GridDataTableWrapper(DataTable dataTable)
        {
            Table = dataTable;
        }

        public DataTable Table { get; private set; }

        public IEnumerator<DataRowView> GetEnumerator()
        {
            if (Table == null)
                yield break;

            foreach (DataRowView row in Table.AsDataView())
            {
                yield return row;
            }
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }

    internal static class GridDataTableWrapperExtensions
    {
        internal static GridDataTableWrapper WrapAsEnumerable(this DataTable dataTable)
        {
            return new GridDataTableWrapper(dataTable);
        }

        internal static IEnumerable SerializeToDictionary(this IEnumerable enumerable, DataTable ownerDataTable)
        {
            if (enumerable is IEnumerable<AggregateFunctionsGroup> || enumerable is IEnumerable<IGroup>)
            {
                return enumerable.OfType<IGroup>()
                                 .Select(group => SerializeGroupItem(ownerDataTable, group));
            }            
            return enumerable.OfType<DataRowView>()
                                    .Select(row =>
                                    {
                                        var result = new Dictionary<string, object>();
                                        SerializeRow(ownerDataTable, row, result);
                                        return result;
                                    });
        }

        private static Dictionary<string, object> SerializeGroupItem(DataTable ownerDataTable, IGroup group)
        {
            var result = new Dictionary<string, object>
                        {                         
                            {"Key", group.Key},
                            {"HasSubgroups", group.HasSubgroups},
                            {"Items", group.Items.SerializeToDictionary(ownerDataTable)}, 
                            {"Subgroups", group.Subgroups.SerializeToDictionary(ownerDataTable)}
                        };

            var aggregateGroup = group as AggregateFunctionsGroup;
            if (aggregateGroup != null)
            {
                result.Add("AggregateFunctionsProjection", aggregateGroup.AggregateFunctionsProjection);
                result.Add("Aggregates", aggregateGroup.Aggregates);
            }
            return result;
        }

        public static  Dictionary<string, object> SerializeRow(this DataRowView row)
        {
            var table = row.DataView.Table;
            var result = new Dictionary<string, object>();
            SerializeRow(table, row, result);
            return result;
        }

        public static Dictionary<string, object> SerializeRow(this DataRow row)
        {
            var table = row.Table;
            return table.Columns.Cast<DataColumn>().ToDictionary(column => column.ColumnName, column => row.Field<object>(column.ColumnName));
        }

        private static void SerializeRow(DataTable dataTable, DataRowView row, Dictionary<string, object> owner)
        {
            foreach (DataColumn column in dataTable.Columns)
            {
                owner.Add(column.ColumnName, row.Row.Field<object>(column.ColumnName));
            }
        }
    }
}
