namespace Kendo.Mvc.UI.Html
{
    using System.Linq;
    using System.Web.Mvc;
    using Infrastructure;

    class GridTableBuilderGroupColDecorator : IGridTableBuilderDecorator
    {
        private readonly int groupCount;

        public GridTableBuilderGroupColDecorator(int groupCount)
        {
            this.groupCount = groupCount;
        }

        public void Decorate(IHtmlNode table)
        {

            var colGroup = table.Children.FirstOrDefault();
            if (colGroup != null)
            {
                for (int i = 0; i < groupCount; i++)
                {
                    var td = CreateCol();

                    colGroup.Children.Insert(0, td);
                }    
            }
        }

        private IHtmlNode CreateCol()
        {
            return new HtmlElement("col", TagRenderMode.SelfClosing).AddClass(UIPrimitives.Grid.GroupCol);
        }
    }
}
