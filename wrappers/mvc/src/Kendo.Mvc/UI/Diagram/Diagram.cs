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

    public class Diagram : WidgetBase
    {
        public IUrlGenerator urlGenerator;

        public Diagram(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            DataSource = new HierarchicalDataSource();

            VisualTemplate = new ClientHandlerDescriptor();
            //>> Initialization
        
            ConnectionDefaults = new DiagramConnectionDefaultsSettings();
                
            Connections = new List<DiagramConnection>();
                
            Layout = new DiagramLayoutSettings();
                
            ShapeDefaults = new DiagramShapeDefaultsSettings();
                
            Shapes = new List<DiagramShape>();
                
        //<< Initialization
        }

        public HierarchicalDataSource DataSource
        {
            get;
            private set;
        }

//>> Fields
        
        public bool? AutoBind { get; set; }
        
        public double? ZoomRate { get; set; }
        
        public bool? Draggable { get; set; }
        
        public DiagramLayoutSettings Layout
        {
            get;
            set;
        }
        
        public string TemplateId { get; set; }
        
        public bool? Resizable { get; set; }
        
        public bool? Rotatable { get; set; }
        
        public DiagramConnectionDefaultsSettings ConnectionDefaults
        {
            get;
            set;
        }
        
        public List<DiagramConnection> Connections
        {
            get;
            set;
        }
        
        public DiagramShapeDefaultsSettings ShapeDefaults
        {
            get;
            set;
        }
        
        public List<DiagramShape> Shapes
        {
            get;
            set;
        }
        
        //<< Fields

        public ClientHandlerDescriptor VisualTemplate { get; set; }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url))
            {
                json["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                json["dataSource"] = DataSource.Data;
            }

//>> Serialization
        
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (ZoomRate.HasValue)
            {
                json["zoomRate"] = ZoomRate;
            }
                
            if (Draggable.HasValue)
            {
                json["draggable"] = Draggable;
            }
                
            var layout = Layout.ToJson();
            if (layout.Any())
            {
                json["layout"] = layout;
            }
                
            if (TemplateId.HasValue())
            {
                json["template"] = TemplateId;
            }
            
            if (Resizable.HasValue)
            {
                json["resizable"] = Resizable;
            }
                
            if (Rotatable.HasValue)
            {
                json["rotatable"] = Rotatable;
            }
                
            var connectionDefaults = ConnectionDefaults.ToJson();
            if (connectionDefaults.Any())
            {
                json["connectionDefaults"] = connectionDefaults;
            }
                
            var connections = Connections.ToJson();
            if (connections.Any())
            {
                json["connections"] = connections;
            }
                
            var shapeDefaults = ShapeDefaults.ToJson();
            if (shapeDefaults.Any())
            {
                json["shapeDefaults"] = shapeDefaults;
            }
                
            var shapes = Shapes.ToJson();
            if (shapes.Any())
            {
                json["shapes"] = shapes;
            }
                
        //<< Serialization

            if (VisualTemplate.HasValue())
            {
                json["visualTemplate"] = VisualTemplate;
            }

            writer.Write(Initializer.Initialize(Selector, "Diagram", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new DiagramHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

