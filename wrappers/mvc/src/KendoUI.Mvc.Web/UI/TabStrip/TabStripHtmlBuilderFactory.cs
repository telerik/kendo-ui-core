

namespace KendoUI.Mvc.UI
{

    using Infrastructure;

    public class TabStripHtmlBuilderFactory : ITabStripHtmlBuilderFactory
    {
        private readonly IActionMethodCache actionMethodCache;

        public TabStripHtmlBuilderFactory(IActionMethodCache actionMethodCache)
        {
            Guard.IsNotNull(actionMethodCache, "actionMethodCache");

            this.actionMethodCache = actionMethodCache;
        }

        public ITabStripHtmlBuilder Create(TabStrip tabStrip)
        {
            return new TabStripHtmlBuilder(tabStrip, actionMethodCache);
        }
    }
}