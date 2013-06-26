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
    using Kendo.Mvc.Resources;

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
        
        public bool PushState { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var container = "document.body";

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

            if (Id.HasValue())
            {
                container = "\"" + Selector + "\"";
            }

            if (PushState)
            {
                options.Add("pushState", PushState);
                var url = new System.Web.Mvc.UrlHelper(ViewContext.RequestContext);
                var routeData = ViewContext.RequestContext.RouteData.Values;
                
                options.Add("root", url.Action(string.Empty, routeData) + "/");                        
            }

            writer.Write(String.Format("jQuery(function(){{ new kendo.mobile.Application(jQuery({0}), {1}); }});", container, Initializer.Serialize(options)));

            base.WriteInitializationScript(writer);
        }

        public override void VerifySettings()
        {
            //Name is not mandatory for MobilApplication
            //base.VerifySettings();

            if (ServerNavigation && PushState)
            {
                throw new NotSupportedException(Exceptions.CannotUsePushStateWithServerNavigation);                
            }
        }       
    }
}

