namespace Kendo.Mvc.UI
{
    public class PivotConfiguratorHtmlBuilder
    {
        public PivotConfiguratorHtmlBuilder(PivotConfigurator pivotConfigurator)
        {
            PivotConfigurator = pivotConfigurator;
        }

        public PivotConfigurator PivotConfigurator
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            return new HtmlElement("div")
                            .Attribute("id", PivotConfigurator.Id)
                            .Attributes(PivotConfigurator.HtmlAttributes);
        }
    }
}
