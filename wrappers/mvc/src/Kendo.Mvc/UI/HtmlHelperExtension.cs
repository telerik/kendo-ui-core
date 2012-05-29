namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    /// <summary>
    /// HTMLHelper extension for providing access to <see cref="ViewComponentFactory"/>.
    /// </summary>
    public static class HtmlHelperExtension
    {
        /// <summary>
        /// Gets the Telerik View Component Factory
        /// </summary>
        /// <param name="helper">The helper.</param>
        /// <returns>The Factory</returns>
        public static ViewComponentFactory Kendo(this HtmlHelper helper)
        {
            return new ViewComponentFactory(helper);
        }

        /// <summary>
        /// Gets the Telerik View Component Factory
        /// </summary>
        /// <param name="helper">The helper.</param>
        /// <returns>The Factory</returns>
        public static ViewComponentFactory<TModel> Kendo<TModel>(this HtmlHelper<TModel> helper)
        {
            return new ViewComponentFactory<TModel>(helper);
        }
    }
}