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

    public class TreeMap : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public TreeMap(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public object? DataSource { get; set; }
        
        public bool? AutoBind { get; set; }
        
        public string ValueField { get; set; }
        
        public string ColorField { get; set; }
        
        public string TextField { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        public string[] Colors { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (DataSource.HasValue)
            {
                json["dataSource"] = DataSource;
            }
                
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (ValueField.HasValue())
            {
                json["valueField"] = ValueField;
            }
            
            if (ColorField.HasValue())
            {
                json["colorField"] = ColorField;
            }
            
            if (TextField.HasValue())
            {
                json["textField"] = TextField;
            }
            
            if (!string.IsNullOrEmpty(TemplateId))
            {
                json["template"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        TemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(Template))
            {
                json["template"] = Template;
            }
                
            if (Colors != null)
            {
                json["colors"] = Colors;
            }
	    
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "TreeMap", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new TreeMapHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

