// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring template columns
    /// </summary>
    public class GridTemplateColumnBuilder<T> : GridColumnBuilderBase<IGridTemplateColumn<T>, GridTemplateColumnBuilder<T>>
        where T : class
    {
        public GridTemplateColumnBuilder(IGridTemplateColumn<T> column) : base(column)
        {
        }

        public virtual GridTemplateColumnBuilder<T> ClientTemplate(string value)
        {
            Column.ClientTemplate = value;

            return this;
        }
    }
}