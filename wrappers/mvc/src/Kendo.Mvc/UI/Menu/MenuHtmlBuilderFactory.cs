namespace Kendo.Mvc.UI
{

    using Infrastructure;

    public class MenuHtmlBuilderFactory : INavigationComponentHtmlBuilderFactory<Menu, MenuItem>
    {
        private readonly IActionMethodCache actionMethodCache;

        public MenuHtmlBuilderFactory(IActionMethodCache actionMethodCache)
        {
            Guard.IsNotNull(actionMethodCache, "actionMethodCache");

            this.actionMethodCache = actionMethodCache;
        }

        public INavigationComponentHtmlBuilder<MenuItem> Create(Menu menu)
        {
            return new MenuHtmlBuilder(menu, actionMethodCache);
        }
    }
}