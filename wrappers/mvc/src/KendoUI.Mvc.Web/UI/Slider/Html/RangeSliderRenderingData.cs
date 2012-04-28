namespace KendoUI.Mvc.UI.Html
{
    using System.Collections.Generic;

    public class RangeSliderRenderingData
    {
        public string Id
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public object MinValue
        {
            get;
            set;
        }
        public object MaxValue
        {
            get;
            set;
        }
        public object SmallStep
        {
            get;
            set;
        }
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            set;
        }
        public bool Enabled
        {
            get;
            set;
        }
        public string SelectionStart 
        { 
            get; 
            set; 
        }
        public string SelectionEnd
        {
            get;
            set;
        }
    }
}