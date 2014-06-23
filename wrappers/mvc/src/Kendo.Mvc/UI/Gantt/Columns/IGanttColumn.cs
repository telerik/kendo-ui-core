namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;
    using Kendo.Mvc.UI.Html;

    public interface IGanttColumn
    {      
        string Title 
        { 
            get; 
            set; 
        }

        int? Width 
        { 
            get; 
            set; 
        }

        bool? Editable
        {
            get;
            set;
        }
    }
}
