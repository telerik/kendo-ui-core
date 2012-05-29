namespace Kendo.Mvc.UI
{

    using Infrastructure;

    public class TabStripHtmlBuilderFactory : ITabStripHtmlBuilderFactory
    {
        private readonly IActionMethodCache actionMethodCache;

        public TabStripHtmlBuilderFactory(IActionMethodCache actionMethodCache)
        {
            this.actionMethodCache = actionMethodCache;
        }

        public ITabStripHtmlBuilder Create(TabStrip tabStrip)
        {
            return new TabStripHtmlBuilder(tabStrip);
        }
    }
}