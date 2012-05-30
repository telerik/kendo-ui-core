namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    
    public class GridToolBarData
    {
        public IEnumerable<IGridActionCommand> Commands 
        { 
            get; 
            set; 
        }

        public IGridUrlBuilder UrlBuilder
        {
            get;
            set;
        }

        public IGridLocalization Localization 
        { 
            get; 
            set; 
        }

        public HtmlTemplate Template
        {
            get;
            set;
        }
    }
}
