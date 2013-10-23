using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    public class ColumnMenuMessages : JsonObject
    {
        public ColumnMenuMessages()
        {
            Filter = Messages.Filter_Filter;
            Columns = Messages.Grid_Columns; 
            SortAscending = Messages.Grid_SortAscending;
            SortDescending = Messages.Grid_SortDescending;
            Done = Messages.Grid_Done;
            ColumnSettings = Messages.Grid_ColumnSettings;
        }

        public string SortAscending { get; set; }
        public string SortDescending { get; set; }        
        public string Filter { get; set; }
        public string Columns { get; set; }
        public string Done { get; set; }
        public string ColumnSettings { get; set; }

        private const string DefaultSortAscending = "Sort Ascending";
        private const string DefaultSortDescending = "Sort Descending";
        private const string DefaultFilter = "Filter";
        private const string DefaultColumns = "Columns";
        private const string DefaultDone = "Done";
        private const string DefaultColumnSettings = "Column Settings";  

        protected override void Serialize(IDictionary<string, object> json)
        {            
            if (Filter != DefaultFilter)
            {
                json["filter"] = Filter;
            }

            if (Columns != DefaultColumns)
            {
                json["columns"] = Columns;
            }
            
            if (SortAscending != DefaultSortAscending)
            {
                json["sortAscending"] = SortAscending;
            }

            if (SortDescending != DefaultSortDescending)
            {
                json["sortDescending"] = SortDescending;
            }

            if (Done != DefaultDone)
            {
                json["done"] = Done;
            }

            if (ColumnSettings != DefaultColumnSettings)
            {
                json["settings"] = ColumnSettings;
            }  
        }
    }
}
