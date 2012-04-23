

namespace KendoUI.Mvc.UI.Html
{
    using System.Web.Mvc;

    public class SliderHtmlBuilder: ISliderHtmlBuilder 
    {
        private readonly SliderRenderingData renderingData;

        public SliderHtmlBuilder(SliderRenderingData renderingData)
        {
            this.renderingData = renderingData;
        }

        public IHtmlNode Build()
        {
            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new 
                   {
                       id = renderingData.Id,
                       type = "range",
                       name = renderingData.Name,
                       min = renderingData.MinValue,
                       max = renderingData.MaxValue,
                       step = renderingData.SmallStep,
                       value = renderingData.Value
                   })
                   .Attributes(renderingData.HtmlAttributes)
                   .ToggleClass("t-state-disabled", !renderingData.Enabled);
        }
    }
}