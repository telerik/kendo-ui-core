// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    public class GridHtmlBuilderFactory : IGridHtmlBuilderFactory
    {
        private readonly IGridDataSectionBuilder dataSectionBuilder;

        private readonly IGridFunctionalSectionBuilder functionalSectionBuilder;

        private readonly IGridTableBulderFactory tableBuilderFactory;

        public GridHtmlBuilderFactory(IGridFunctionalSectionBuilder functionalSectionBuilder, IGridDataSectionBuilder dataSectionBuilder, 
            IGridTableBulderFactory tableBuilderFactory)
        {
            this.tableBuilderFactory = tableBuilderFactory;
            this.functionalSectionBuilder = functionalSectionBuilder;
            this.dataSectionBuilder = dataSectionBuilder;
        }

        public IGridHtmlBuilder CreateBuilder(bool scrollable)
        {
            if (scrollable)
            {
                return new GridScrollingHtmlBuilder(functionalSectionBuilder, dataSectionBuilder, tableBuilderFactory);
            }

            return new GridHtmlBuilder(functionalSectionBuilder, dataSectionBuilder, tableBuilderFactory);
        }
    }
}