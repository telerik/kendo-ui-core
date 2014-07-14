using System;
using System.Collections.Generic;
using System.Linq;


namespace Kendo.Mvc.UI
{
    public class GridBoundColumnFilterableSettings : GridFilterableSettings
    {
        public GridBoundColumnFilterableSettings()
        {
            Enabled = true;
            FilterUIHandler = new ClientHandlerDescriptor();
            CellSettings = new GridColumnFilterableCellSettings();
        }

        public GridFilterUIRole FilterUIRole { get; set; }
        public ClientHandlerDescriptor FilterUIHandler { get; set; }
        public GridColumnFilterableCellSettings CellSettings { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {            
            base.Serialize(json);

            if (FilterUIHandler.HasValue())
            {
                json["ui"] = FilterUIHandler;                
            }
            else if (FilterUIRole != GridFilterUIRole.Default)
            {
                json["ui"] = Enum.GetName(typeof(GridFilterUIRole), FilterUIRole).ToLowerInvariant();                
            }

           var cellSettings = CellSettings.ToJson();
           if (cellSettings.Any())
            {
                json["cell"] = cellSettings;
            }
            
        }
    }
}