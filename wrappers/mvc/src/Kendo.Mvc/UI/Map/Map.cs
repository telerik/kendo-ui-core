namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class Map : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public Map(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Controls = new MapControlsSettings();
                
            LayerDefaults = new MapLayerDefaultsSettings();
                
            Layers = new List<MapLayer>();
                
            MarkerDefaults = new MapMarkerDefaultsSettings();
                
            Markers = new List<MapMarker>();
                
        //<< Initialization
        }

//>> Fields
        
        public MapControlsSettings Controls
        {
            get;
            private set;
        }
        
        public MapLayerDefaultsSettings LayerDefaults
        {
            get;
            private set;
        }
        
        public List<MapLayer> Layers
        {
            get;
            private set;
        }
        
        public MapMarkerDefaultsSettings MarkerDefaults
        {
            get;
            private set;
        }
        
        public List<MapMarker> Markers
        {
            get;
            private set;
        }
        
        public double MinZoom { get; set; }
        
        public double MaxZoom { get; set; }
        
        public double MinSize { get; set; }
        
        public string Theme { get; set; }
        
        public double Zoom { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            //>> Serialization
        
            options["controls"] = Controls.ToJson();
        
            options["layerDefaults"] = LayerDefaults.ToJson();
        
            options["layers"] = Layers.ToJson();
        
            options["markerDefaults"] = MarkerDefaults.ToJson();
        
            options["markers"] = Markers.ToJson();
        
        
            options["maxZoom"] = MaxZoom;
        
            options["minSize"] = MinSize;
        
            options["minZoom"] = MinZoom;
        
            options["theme"] = Theme;
        
            options["zoom"] = Zoom;
        
            //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "Map", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new MapHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

