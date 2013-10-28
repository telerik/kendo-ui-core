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
        
        public int MinZoom { get; set; }
        
        public int MaxZoom { get; set; }
        
        public int MinSize { get; set; }
        
        public string Theme { get; set; }
        
        public int Zoom { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        
        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new MapHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }
        
    }
}

