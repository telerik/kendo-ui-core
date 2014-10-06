namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class GanttDependency : IGanttDependency
    {
        public int DependencyID 
        { 
            get; 
            set; 
        }

        public int PredecessorID 
        { 
            get; 
            set; 
        }

        public int SuccessorID 
        { 
            get; 
            set; 
        }

        public DependencyType Type 
        { 
            get; 
            set; 
        }
    }
}
