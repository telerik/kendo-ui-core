namespace Kendo.Mvc.UI
{
    using System;

    public interface IGanttDependency
    {
        DependencyType Type 
        { 
            get;
            set; 
        }
    }
}
