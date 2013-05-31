namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class MobileApplication : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileApplication(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            HideAddressBar = true;

            UpdateDocumentTitle = true;

        //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public bool HideAddressBar { get; set; }
        
        public bool UpdateDocumentTitle { get; set; }
        
        public string Initial { get; set; }
        
        public string Layout { get; set; }
        
        public string Loading { get; set; }
        
        public string Platform { get; set; }
        
        public bool ServerNavigation { get; set; }
        
        public string Transition { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            options.Add("hideAddressBar", HideAddressBar);
            options.Add("updateDocumentTitle", UpdateDocumentTitle);
            options.Add("serverNavigation", ServerNavigation);

            if (Layout.HasValue())
            {
                options.Add("layout", Layout);
            }

            if (Loading.HasValue())
            {
                options.Add("loading", Loading);
            }

            if (Platform.HasValue())
            {
                options.Add("platform", Platform);
            }

            if (Transition.HasValue())
            {
                options.Add("transition", Transition);
            }

            writer.Write(String.Format("jQuery(function(){{ new kendo.mobile.Application(jQuery(document.body), {0}); }});", Initializer.Serialize(options)));

            base.WriteInitializationScript(writer);
        }

        public override void VerifySettings()
        {
            //Name is not mandatory for MobilApplication
            //base.VerifySettings();
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            

            base.WriteHtml(writer);
        }
    }
}

