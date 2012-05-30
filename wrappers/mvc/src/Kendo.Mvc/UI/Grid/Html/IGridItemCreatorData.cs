namespace Kendo.Mvc.UI.Html
{
    using System;
    
    public interface IGridItemCreatorData
    {
        bool HasDetailTemplate
        {
            get;
        }
        
        GridItemMode Mode 
        { 
            get; 
        }

        Func<object> CreateNewDataItem
        {
            get;
            set;
        }

        bool ShowGroupFooter
        {
            get;
            set;
        }

        int GroupsCount
        {
            get;
            set;
        }
    }
}