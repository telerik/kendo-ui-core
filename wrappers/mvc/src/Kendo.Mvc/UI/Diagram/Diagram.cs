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

    public class Diagram<TShapeModel, TConnectionModel> : WidgetBase
        where TShapeModel : class
        where TConnectionModel : class
    {
        public IUrlGenerator urlGenerator;

        public Diagram(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            DataSource = new DataSource();
            DataSource.Type = DataSourceType.Ajax;
            DataSource.ModelType(typeof(object));

            ConnectionsDataSource = new DataSource();
            ConnectionsDataSource.Type = DataSourceType.Ajax;
            ConnectionsDataSource.Schema.Model = new DiagramConnectionModelDescriptor(typeof(TConnectionModel));

            //>> Initialization
        
            ConnectionDefaults = new DiagramConnectionDefaultsSettings();
                
            Connections = new List<DiagramConnection>();
                
            Editable = new DiagramEditableSettings<TShapeModel,TConnectionModel>();
                
            Layout = new DiagramLayoutSettings();
                
            Pannable = new DiagramPannableSettings();
                
            Pdf = new DiagramPdfSettings();
                
            Selectable = new DiagramSelectableSettings();
                
            ShapeDefaults = new DiagramShapeDefaultsSettings();
                
            Shapes = new List<DiagramShape>();
                
        //<< Initialization
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

        public DataSource ConnectionsDataSource
        {
            get;
            private set;
        }

//>> Fields
        
        public bool? AutoBind { get; set; }
        
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
        
        public DiagramEditableSettings<TShapeModel,TConnectionModel> Editable
        {
            get;
            set;
        }
        
        public DiagramLayoutSettings Layout
        {
            get;
            set;
        }
        
        public DiagramPannableSettings Pannable
        {
            get;
            set;
        }
        
        public DiagramPdfSettings Pdf
        {
            get;
            set;
        }
        
        public DiagramSelectableSettings Selectable
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
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        public double? Zoom { get; set; }
        
        public double? ZoomMax { get; set; }
        
        public double? ZoomMin { get; set; }
        
        public double? ZoomRate { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url) || DataSource.Type == DataSourceType.Custom)
            {
                json["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                json["dataSource"] = DataSource.Data;
            }

            if (!string.IsNullOrEmpty(ConnectionsDataSource.Transport.Read.Url) || ConnectionsDataSource.Type == DataSourceType.Custom)
            {
                json["connectionsDataSource"] = ConnectionsDataSource.ToJson();
            }
            else if (ConnectionsDataSource.Data != null)
            {
                json["connectionsDataSource"] = ConnectionsDataSource.Data;
            }

//>> Serialization
        
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
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
            var layout = Layout.ToJson();
            if (layout.Any())
            {
                json["layout"] = layout;
            }
            var pannable = Pannable.ToJson();
            if (pannable.Any())
            {
                json["pannable"] = pannable;
            } else if (Pannable.Enabled != true) {
                json["pannable"] = Pannable.Enabled;
            }

            var pdf = Pdf.ToJson();
            if (pdf.Any())
            {
                json["pdf"] = pdf;
            }
            var selectable = Selectable.ToJson();
            if (selectable.Any())
            {
                json["selectable"] = selectable;
            } else if (Selectable.Enabled != true) {
                json["selectable"] = Selectable.Enabled;
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
                
            if (Zoom.HasValue)
            {
                json["zoom"] = Zoom;
            }
                
            if (ZoomMax.HasValue)
            {
                json["zoomMax"] = ZoomMax;
            }
                
            if (ZoomMin.HasValue)
            {
                json["zoomMin"] = ZoomMin;
            }
                
            if (ZoomRate.HasValue)
            {
                json["zoomRate"] = ZoomRate;
            }
                
        //<< Serialization

            if (Editable != null)
            {
                var editable = Editable.ToJson();
                if (editable.Any())
                {
                    json["editable"] = editable;
                }
            }
            else 
            {
                json["editable"] = false;
            }

            writer.Write(Initializer.Initialize(Selector, "Diagram", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new DiagramHtmlBuilder<TShapeModel, TConnectionModel>(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

