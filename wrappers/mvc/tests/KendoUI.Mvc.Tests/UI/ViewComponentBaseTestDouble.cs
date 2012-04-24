namespace KendoUI.Mvc.UI.Tests
{
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;
    
    public class ViewComponentBaseTestDouble : ViewComponentBase
    {
        public bool HasEnsuredRequired;
        public bool HasWrittenHtml;

        public ViewComponentBaseTestDouble(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory) : base(viewContext, clientSideObjectWriterFactory)
        {
        }

        public void InitializationScript(TextWriter writer)
        {
            base.WriteInitializationScript(writer);
        }

        public void CleanupScript(TextWriter writer)
        {
            base.WriteCleanupScript(writer);
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