namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public static class HtmlHelperExtension
    {
        public static ViewComponentFactory Kendo(this HtmlHelper helper)
        {
            return new ViewComponentFactory(helper);
        }

        public static ViewComponentFactory<TModel> Kendo<TModel>(this HtmlHelper<TModel> helper)
        {
            return new ViewComponentFactory<TModel>(helper);
        }
    }
}