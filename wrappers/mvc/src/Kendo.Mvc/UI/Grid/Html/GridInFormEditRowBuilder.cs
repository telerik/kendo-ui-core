namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Infrastructure;

    public class GridInFormEditRowBuilder : IGridRowBuilder
    {
        private readonly int colspan;
        private readonly IGridEditFormBuilder editFormBuilder;

        public GridInFormEditRowBuilder(IGridEditFormBuilder editFormBuilder, int colspan)
        {
            this.editFormBuilder = editFormBuilder;
            this.colspan = colspan;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");

            var td = new HtmlElement("td")
                            .Attribute("colspan", colspan.ToString());
            
            td.AppendTo(tr);
            
            var form = editFormBuilder.CreateForm();

            form.AppendTo(td);
            
            return tr;
        }
    }
}