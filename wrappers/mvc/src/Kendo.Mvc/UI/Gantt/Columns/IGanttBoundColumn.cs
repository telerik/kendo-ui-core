namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;

    public interface IGanttBoundColumn : IGanttColumn
    {
        string Member
        {
            get;
            set;
        }

        Type MemberType
        {
            get;
            set;
        }

        object AdditionalViewData 
        { 
            get;
            set; 
        }
    }
}
