namespace KendoUI.Mvc.UI
{

    using Infrastructure;

    public class PanelBarHtmlBuilderFactory : INavigationComponentHtmlBuilderFactory<PanelBar, PanelBarItem>
    {
        private readonly IActionMethodCache actionMethodCache;

        public PanelBarHtmlBuilderFactory(IActionMethodCache actionMethodCache)
        {
            Guard.IsNotNull(actionMethodCache, "actionMethodCache");

            this.actionMethodCache = actionMethodCache;
        }

        public INavigationComponentHtmlBuilder<PanelBarItem> Create(PanelBar panelBar)
        {
            return new PanelBarHtmlBuilder(panelBar, actionMethodCache);
        }
    }
}