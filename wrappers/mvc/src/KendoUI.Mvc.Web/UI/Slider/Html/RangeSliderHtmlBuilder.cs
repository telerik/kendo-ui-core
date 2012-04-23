// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
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
                        .ToggleClass("t-state-disabled", !renderingData.Enabled);

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