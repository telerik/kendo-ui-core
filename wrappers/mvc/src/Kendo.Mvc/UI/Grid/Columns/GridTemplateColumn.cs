namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.UI.Html;
    using System;
    using Infrastructure;

    public class GridTemplateColumn<T> : GridColumnBase<T>, IGridTemplateColumn<T> where T : class
    {
        public GridTemplateColumn(Grid<T> grid, Action<T> template) : base(grid)
        {

            Template = template;
        }
        
        public GridTemplateColumn(Grid<T> grid, Func<T, object> template)
            : base(grid)
        {

            InlineTemplate = template;
        }
       
        protected override IGridDataCellBuilder CreateEditBuilderCore(IGridHtmlHelper htmlHelper)
        {
            return CreateDisplayBuilderCore(htmlHelper);
        }
        
        protected override IGridDataCellBuilder CreateInsertBuilderCore(IGridHtmlHelper htmlHelper)
        {
            return CreateDisplayBuilderCore(htmlHelper);
        }
    }
}