// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;
    using System.Linq;

    public class GridTableBuilderFactory : IGridTableBulderFactory
    {
        public IGridTableBuilder CreateTableBuilder(IEnumerable<GridColData> colsData)
        {
            return new GridTableBuilder(colsData);
        }

        public IGridTableBuilder CreateDecoratedTableBuilder(IEnumerable<GridColData> colsData, GridRenderingData renderingData)
        {
            var tableBuilder = CreateTableBuilder(colsData);
            tableBuilder.Decorators.Add(new GridTableBuilderGroupColDecorator(renderingData.GroupMembers.Count()));
            tableBuilder.Decorators.Add(new GridTableBuilderDetailViewColDecorator(renderingData.HasDetailView));
            return tableBuilder;
        }
    }
}