namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    
    public class WidgetBaseTestDouble : WidgetBase
    {
        public bool HasEnsuredRequired;
        public bool HasWrittenHtml;

        public WidgetBaseTestDouble(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer)
            : base(viewContext, javaScriptInitializer)
        {
        }

        public void InitializationScript(TextWriter writer)
        {
            base.WriteInitializationScript(writer);
        }

        public void CheckRequired()
        {
            base.VerifySettings();
        }

        public void Html()
        {
            base.WriteHtml(new HtmlTextWriter(TextWriter.Null));
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            HasEnsuredRequired = true;
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            base.WriteHtml(writer);
            HasWrittenHtml = true;
        }
    }
}