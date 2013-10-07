using System;
using System.Web.Mvc;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Html
{
    public class ProgressBarHtmlBuilder : HtmlBuilderBase
    {
        private readonly ProgressBar progressBar;

        public ProgressBarHtmlBuilder(ProgressBar component)
        {
            progressBar = component;
        }

        public IHtmlNode CreateProgressBar()
        {
            var element = new  HtmlElement("div").Attribute("id", progressBar.Id);

            return element;
        }

        protected override IHtmlNode BuildCore()
        {
            return CreateProgressBar();
        }
    }
}
