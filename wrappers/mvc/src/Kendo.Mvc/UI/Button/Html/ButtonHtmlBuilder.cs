namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class ButtonHtmlBuilder: IButtonHtmlBuilder
    {
        public ButtonHtmlBuilder(Button button)
        {
            Button = button;
        }

        public Button Button
        {
            get;
            private set;
        }

        public IHtmlNode ButtonTag()
        {
            var defaultOptions = new Dictionary<string, object>();
            FluentDictionary.For(defaultOptions)
                .Add("id", Button.Name);

            var el = new HtmlElement(Button.Tag)
                   .Attributes(defaultOptions)
                   .Attributes(Button.HtmlAttributes);

            Button.Template.Apply(el);

            return el;
        }
    }
}