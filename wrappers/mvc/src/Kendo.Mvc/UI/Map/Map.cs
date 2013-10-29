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

        public double[] Center { get; set; }

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
        
        public double? MinZoom { get; set; }
        
        public double? MaxZoom { get; set; }
        
        public double? MinSize { get; set; }
        
        public string Theme { get; set; }
        
        public double? Zoom { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            if (Center != null)
            {
                json["center"] = Center;
            }

            //>> Serialization
        
            var controls = Controls.ToJson();
            if (controls.Any())
            {
                json["controls"] = controls;
            }
                
            var layerDefaults = LayerDefaults.ToJson();
            if (layerDefaults.Any())
            {
                json["layerDefaults"] = layerDefaults;
            }
                
            var layers = Layers.ToJson();
            if (layers.Any())
            {
                json["layers"] = layers;
            }
                
            var markerDefaults = MarkerDefaults.ToJson();
            if (markerDefaults.Any())
            {
                json["markerDefaults"] = markerDefaults;
            }
                
            var markers = Markers.ToJson();
            if (markers.Any())
            {
                json["markers"] = markers;
            }
                
            if (MinZoom.HasValue)
            {
                json["minZoom"] = MinZoom;
            }
                
            if (MaxZoom.HasValue)
            {
                json["maxZoom"] = MaxZoom;
            }
                
            if (MinSize.HasValue)
            {
                json["minSize"] = MinSize;
            }
                
            if (Theme.HasValue())
            {
                json["theme"] = Theme;
            }
            
            if (Zoom.HasValue)
            {
                json["zoom"] = Zoom;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "Map", json));

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

