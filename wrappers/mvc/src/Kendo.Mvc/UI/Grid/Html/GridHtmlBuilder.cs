namespace Kendo.Mvc.UI.Html
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

            AppendData(div, renderingData);

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
            if (functionalData.ToolBar)
            {
                var toolBar = CreateToolBar(functionalData.ToolBarData);
                
                toolBar.AddClass("k-grid-top").AppendTo(div);
            }
        }
        
        protected virtual IHtmlNode CreateToolBar(GridToolBarData toolBarData)
        {
           return FunctionalSectionBuilder.CreateToolBar(toolBarData);
        }
        
        protected void AppendGroupHeader(IHtmlNode div, GridFunctionalData functionalData)
        {
            if (functionalData.GroupHeader)
            {
                var groupHeader = CreateGroupHeader(functionalData);

                groupHeader.AppendTo(div);
            }
        }
        
        protected void AppendBottomPager(IHtmlNode div, GridFunctionalData functionalData)
        {
            if (functionalData.Pager)
            {
                var pager = new HtmlElement("div").AddClass("k-pager-wrap", "k-grid-pager");
                
                pager.AppendTo(div);

                if (functionalData.Pager)
                {
                    CreateBottomPager(functionalData.PagerData).AppendTo(pager);
                }
            }
        }
        
        protected virtual IHtmlNode CreateHeader(GridRenderingData renderingData)
        {
            var thead = new HtmlElement("thead").AddClass("k-grid-header");

            var tr = DataSectionBuilder.CreateHeader(renderingData);
            tr.AppendTo(thead);

            return thead;
        }        
        
        protected virtual IHtmlNode CreateFooter(GridRenderingData renderingData)
        {
            var tfoot = new HtmlElement("tfoot");
            tfoot.AddClass("k-grid-footer");
            
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
            //TODO: Implement hidden columns
            var tableBuilder = tableBuilderFactory.CreateDecoratedTableBuilder(renderingData.Columns.Select(c => new GridColData{ Width = c.Width/*, Hidden = c.Hidden*/}), renderingData);
            
            return tableBuilder.CreateTable()
                               .Attributes(renderingData.TableHtmlAttributes);
        }
        
        protected virtual IHtmlNode CreateWrapper(IDictionary<string, object> htmlAttributes)
        {
            var div = new HtmlElement("div").Attributes(htmlAttributes)
                                        .PrependClass(UIPrimitives.Widget, "k-grid");
            return div;
        }

        protected virtual IHtmlNode CreateBody(GridRenderingData renderingData)
        {
            return DataSectionBuilder.CreateBody(renderingData);
        }

        protected virtual IHtmlNode CreateBottomPager(GridPagerData pagerData)
        {
            return FunctionalSectionBuilder.CreatePager(pagerData);
        }
    }
}
