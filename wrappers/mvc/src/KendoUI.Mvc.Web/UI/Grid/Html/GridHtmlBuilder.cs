// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;
    using System.Linq;
    
    public class GridHtmlBuilder : IGridHtmlBuilder
    {
        private readonly IGridTableBulderFactory tableBuilderFactory;

        public GridHtmlBuilder(IGridFunctionalSectionBuilder functionalSectionBuilder, IGridDataSectionBuilder dataSectionBuilder, IGridTableBulderFactory tableBuilderFactory)
        {
            this.tableBuilderFactory = tableBuilderFactory;
            DataSectionBuilder = dataSectionBuilder;
            FunctionalSectionBuilder = functionalSectionBuilder;
        }

        protected IGridFunctionalSectionBuilder FunctionalSectionBuilder
        {
            get;
            private set;
        }

        protected IGridDataSectionBuilder DataSectionBuilder
        {
            get;
            private set;
        }

        public virtual IHtmlNode CreateGrid(IDictionary<string, object> htmlAttributes, GridFunctionalData functionalData, GridRenderingData renderingData)
        {
            var div = CreateWrapper(htmlAttributes);

            AppendTopToolBar(div, functionalData);

            AppendGroupHeader(div, functionalData);

            AppendTopPager(div, functionalData);

            AppendData(div, renderingData);

            AppendBottomToolBar(div, functionalData);

            AppendBottomPager(div, functionalData);

            return div;
        }

        protected void AppendHeader(IHtmlNode container, GridRenderingData renderingData)
        {
            var thead = CreateHeader(renderingData);
            thead.AppendTo(container);
        }

        protected virtual void AppendData(IHtmlNode div, GridRenderingData renderingData)
        {
            var table = CreateTable(renderingData);

            table.AppendTo(div);

            AppendHeader(table, renderingData);

            AppendFooter(table, renderingData);

            var tbody = CreateBody(renderingData);
            tbody.AppendTo(table);
        }

        protected void AppendFooter(IHtmlNode table, GridRenderingData renderingData)
        {
            if (renderingData.ShowFooter)
            {
                var tfoot = CreateFooter(renderingData);
                tfoot.AppendTo(table);
            }
        }

        protected void AppendTopToolBar(IHtmlNode div, GridFunctionalData functionalData)
        {
            if (functionalData.ShowTopToolBar)
            {
                var toolBar = CreateToolBar(functionalData.ToolBarData);
                
                toolBar.AddClass("t-grid-top").AppendTo(div);
            }
        }
        
        protected void AppendBottomToolBar(IHtmlNode div, GridFunctionalData functionalData)
        {
            if (functionalData.ShowBottomToolBar)
            {
                var toolBar = CreateToolBar(functionalData.ToolBarData);
                toolBar.AddClass("t-grid-bottom").AppendTo(div);
            }
        }
        
        protected virtual IHtmlNode CreateToolBar(GridToolBarData toolBarData)
        {
           return FunctionalSectionBuilder.CreateToolBar(toolBarData);
        }
        
        protected void AppendGroupHeader(IHtmlNode div, GridFunctionalData functionalData)
        {
            if (functionalData.ShowGroupHeader)
            {
                var groupHeader = CreateGroupHeader(functionalData);

                groupHeader.AppendTo(div);
            }
        }
        
        protected void AppendBottomPager(IHtmlNode div, GridFunctionalData functionalData)
        {
            if (functionalData.ShowFooter)
            {
                var pager = new HtmlElement("div").AddClass("t-grid-pager", "t-grid-bottom");
                
                pager.AppendTo(div);

                AppendRefreshButton(pager, functionalData.PagerData);
                
                if (functionalData.ShowBottomPager)
                {
                    CreateBottomPager(functionalData.PagerData).AppendTo(pager);
                }
            }
        }
        
        protected void AppendRefreshButton(IHtmlNode div, GridPagerData pagerData)
        {
            var button = CreateRefreshButton(pagerData);
            button.AppendTo(div);
        }

        protected void AppendTopPager(IHtmlNode div, GridFunctionalData functionalData)
        {
            if (functionalData.ShowTopPager)
            {
                var pager = new HtmlElement("div").AddClass("t-grid-pager", "t-grid-top");
                
                pager.AppendTo(div);

                AppendRefreshButton(pager, functionalData.PagerData);

                CreateTopPager(functionalData.PagerData).AppendTo(pager);
            }
        }
        
        protected virtual IHtmlNode CreateHeader(GridRenderingData renderingData)
        {
            var thead = new HtmlElement("thead").AddClass("t-grid-header");

            var tr = DataSectionBuilder.CreateHeader(renderingData);
            tr.AppendTo(thead);

            return thead;
        }        
        
        protected virtual IHtmlNode CreateFooter(GridRenderingData renderingData)
        {
            var tfoot = new HtmlElement("tfoot");

            var tr = DataSectionBuilder.CreateFooter(renderingData);
            tr.AppendTo(tfoot);
            return tfoot;
        }

        protected virtual IHtmlNode CreateGroupHeader(GridFunctionalData functionalData)
        {
            return FunctionalSectionBuilder.CreateGroupHeader(functionalData.GroupingData);
        }

        protected virtual IHtmlNode CreateTable(GridRenderingData renderingData)
        {
            var tableBuilder = tableBuilderFactory.CreateDecoratedTableBuilder(renderingData.Columns.Select(c => new GridColData{ Width = c.Width, Hidden = c.Hidden}), renderingData);
            
            return tableBuilder.CreateTable()
                               .Attributes(renderingData.TableHtmlAttributes);
        }
        
        protected virtual IHtmlNode CreateWrapper(IDictionary<string, object> htmlAttributes)
        {
            var div = new HtmlElement("div").Attributes(htmlAttributes)
                                        .PrependClass(UIPrimitives.Widget, "t-grid");
            return div;
        }

        protected virtual IHtmlNode CreateBody(GridRenderingData renderingData)
        {
            return DataSectionBuilder.CreateBody(renderingData);
        }

        protected virtual IHtmlNode CreateTopPager(GridPagerData pagerData)
        {
            return FunctionalSectionBuilder.CreatePager(pagerData);
        }
        
        protected virtual IHtmlNode CreateBottomPager(GridPagerData pagerData)
        {
            return FunctionalSectionBuilder.CreatePager(pagerData);
        }

        protected virtual IHtmlNode CreateRefreshButton(GridPagerData pagerData)
        {
            return FunctionalSectionBuilder.CreateRefreshButton(pagerData);
        }
    }
}
