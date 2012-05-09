namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;

    public class RangeSliderHtmlBuilder : IRangeSliderHtmlBuilder 
    {
        private readonly RangeSliderRenderingData renderingData;

        public RangeSliderHtmlBuilder(RangeSliderRenderingData renderingData)
        {
            this.renderingData = renderingData;
        }

        public IHtmlNode Build()
        {
            var div = new HtmlElement("div")
                        .Attributes( new { id = renderingData.Id }) 
                        .Attributes(renderingData.HtmlAttributes)
                        .ToggleClass("k-state-disabled", !renderingData.Enabled);

            new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new
                   {
                       type = "range",
                       name = string.Format("{0}[0]",renderingData.Name),
                       step = renderingData.SmallStep,
                       value = renderingData.SelectionStart
                   })
                   .AppendTo(div);

            new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new
                   {
                       type = "range",
                       name = string.Format("{0}[1]", renderingData.Name),
                       step = renderingData.SmallStep,
                       value = renderingData.SelectionEnd
                   })
                   .AppendTo(div);

            return div;
        }
    }
}