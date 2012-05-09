namespace Kendo.Mvc.UI.Html
{
    public class SliderHtmlBuilderFactory : ISliderHtmlBuilderFactory
    {
        public ISliderHtmlBuilder Create(SliderRenderingData renderingData)
        {
            return new SliderHtmlBuilder(renderingData);
        }
    }
}