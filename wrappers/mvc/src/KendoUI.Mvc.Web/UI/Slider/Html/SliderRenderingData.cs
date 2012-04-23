

namespace KendoUI.Mvc.UI.Html
{
    using System.Collections.Generic;

    public class SliderRenderingData
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
        public string Value
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
    }
}