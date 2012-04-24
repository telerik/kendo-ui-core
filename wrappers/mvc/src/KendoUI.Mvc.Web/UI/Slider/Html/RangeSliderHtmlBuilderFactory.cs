namespace KendoUI.Mvc.UI.Html
{
    public class RangeSliderHtmlBuilderFactory : IRangeSliderHtmlBuilderFactory
    {
        public IRangeSliderHtmlBuilder Create(RangeSliderRenderingData renderingData)
        {
            return new RangeSliderHtmlBuilder(renderingData);
        }
    }
}