namespace Kendo.Mvc.UI.Html
{
    /// <summary>
    /// 
    /// </summary>
    public class GridLinkButtonBuilder : GridButtonBuilderBase
    {
        protected override void ApplyButtonAttributes(IHtmlNode button, object dataItem)
        {
            button.Attribute("href", Url(dataItem));
        }

        protected override string ButtonTagName
        {
            get
            {
                return "a";
            }
        }
    }
}
