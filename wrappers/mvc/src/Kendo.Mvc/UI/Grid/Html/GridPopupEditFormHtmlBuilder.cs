#if MVC2 || MVC3
namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.UI;

    public class GridPopupEditFormHtmlBuilder<T> : GridFormEditRowHtmlBuilder<T>
        where T : class
    {
        public GridPopupEditFormHtmlBuilder(GridRow<T> row)
            : base(row)
        {
        }

        protected override IHtmlNode BuildCore()
        {
            return BuildForm();
        }
    }
}
#endif