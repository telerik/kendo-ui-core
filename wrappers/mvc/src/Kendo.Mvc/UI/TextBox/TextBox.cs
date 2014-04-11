namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Web.Mvc;

    public class TextBox<T> : WidgetBase
    {
        public TextBox(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Enabled = true;
        }

        public T Value
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            VerifySettings();

            TextBoxHtmlBuilder<T> renderer = new TextBoxHtmlBuilder<T>(this);

            renderer.Build().WriteTo(writer);
        }
    }
}