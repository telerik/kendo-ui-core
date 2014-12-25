namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramLayoutSettings : JsonObject
    {
        public DiagramLayoutSettings()
        {
            //>> Initialization
        
            Grid = new DiagramLayoutGridSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public double? EndRadialAngle { get; set; }
        
        public DiagramLayoutGridSettings Grid
        {
            get;
            set;
        }
        
        public double? HorizontalSeparation { get; set; }
        
        public double? Iterations { get; set; }
        
        public double? LayerSeparation { get; set; }
        
        public double? NodeDistance { get; set; }
        
        public double? RadialFirstLevelSeparation { get; set; }
        
        public double? RadialSeparation { get; set; }
        
        public double? StartRadialAngle { get; set; }
        
        public double? UnderneathHorizontalOffset { get; set; }
        
        public double? UnderneathVerticalSeparation { get; set; }
        
        public double? UnderneathVerticalTopOffset { get; set; }
        
        public double? VerticalSeparation { get; set; }
        
        public DiagramLayoutType? Type { get; set; }
        
        public DiagramLayoutSubtype? Subtype { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (EndRadialAngle.HasValue)
            {
                json["endRadialAngle"] = EndRadialAngle;
            }
                
            var grid = Grid.ToJson();
            if (grid.Any())
            {
                json["grid"] = grid;
            }
            if (HorizontalSeparation.HasValue)
            {
                json["horizontalSeparation"] = HorizontalSeparation;
            }
                
            if (Iterations.HasValue)
            {
                json["iterations"] = Iterations;
            }
                
            if (LayerSeparation.HasValue)
            {
                json["layerSeparation"] = LayerSeparation;
            }
                
            if (NodeDistance.HasValue)
            {
                json["nodeDistance"] = NodeDistance;
            }
                
            if (RadialFirstLevelSeparation.HasValue)
            {
                json["radialFirstLevelSeparation"] = RadialFirstLevelSeparation;
            }
                
            if (RadialSeparation.HasValue)
            {
                json["radialSeparation"] = RadialSeparation;
            }
                
            if (StartRadialAngle.HasValue)
            {
                json["startRadialAngle"] = StartRadialAngle;
            }
                
            if (UnderneathHorizontalOffset.HasValue)
            {
                json["underneathHorizontalOffset"] = UnderneathHorizontalOffset;
            }
                
            if (UnderneathVerticalSeparation.HasValue)
            {
                json["underneathVerticalSeparation"] = UnderneathVerticalSeparation;
            }
                
            if (UnderneathVerticalTopOffset.HasValue)
            {
                json["underneathVerticalTopOffset"] = UnderneathVerticalTopOffset;
            }
                
            if (VerticalSeparation.HasValue)
            {
                json["verticalSeparation"] = VerticalSeparation;
            }
                
            if (Type.HasValue)
            {
                json["type"] = Type;
            }
                
            if (Subtype.HasValue)
            {
                json["subtype"] = Subtype;
            }
                
        //<< Serialization
        }
    }
}
