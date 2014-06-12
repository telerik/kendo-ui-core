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

    /// <summary>
    /// The server side wrapper for Kendo UI Gantt
    /// </summary>
    public class Gantt : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public Gantt(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public bool? AutoBind { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "Gantt", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new GanttHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

