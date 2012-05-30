namespace Kendo.Mvc.UI.Html
{
    public class GridPopUpInsertRowBuilder : IGridRowBuilder
    {
        private readonly IGridEditFormBuilder editFormBuilder;

        private readonly IHtmlNode container;

        public GridPopUpInsertRowBuilder(IGridEditFormBuilder editFormBuilder, IHtmlNode container)
        {
            this.container = container;
            this.editFormBuilder = editFormBuilder;
        }

        public IHtmlNode CreateRow()
        {
            var form = editFormBuilder.CreateForm();

            form.AppendTo(container);

            return null;
        }
    }
}
