namespace Kendo.Mvc.UI.Html
{
    public class GridPopUpEditRowBuilder : IGridRowBuilder
    {
        private readonly IGridEditFormBuilder editFormBuilder;

        private readonly IHtmlNode container;

        private readonly IGridRowBuilder dataRowBuilder;

        public GridPopUpEditRowBuilder(IGridRowBuilder dataRowBuilder, IGridEditFormBuilder editFormBuilder, IHtmlNode container)
        {
            this.dataRowBuilder = dataRowBuilder;
            this.container = container;
            this.editFormBuilder = editFormBuilder;
        }

        public IHtmlNode CreateRow()
        {
            var form = editFormBuilder.CreateForm();

            form.AppendTo(container);

            return dataRowBuilder.CreateRow();
        }
    }
}
