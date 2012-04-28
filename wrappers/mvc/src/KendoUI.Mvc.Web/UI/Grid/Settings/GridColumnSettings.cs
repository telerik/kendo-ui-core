namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.Text.RegularExpressions;
    using System.Web.Routing;
    using KendoUI.Mvc.Extensions;

    public class GridColumnSettings<T> : GridColumnSettings
        where T : class
    {
        public Action<T> Template
        {
            get;
            set;
        }
    }
    
    public class GridColumnSettings
    {
        private string member;
        private string clientTemplate;

        public GridColumnSettings()
        {
            Sortable = true;
            Encoded = true;
            Filterable = true;
            Groupable = true;
            Visible = true;
            IncludeInContextMenu = true;
            HeaderHtmlAttributes = new RouteValueDictionary();
            HtmlAttributes = new RouteValueDictionary();
            FooterHtmlAttributes = new RouteValueDictionary();
        }

        public Action HeaderTemplate
        {
            get;
            set;
        }

        public Action<GridAggregateResult> FooterTemplate
        {
            get;
            set;
        }

        public string ClientTemplate
        {
            get
            {
                return clientTemplate;
            }
            set
            {
                clientTemplate = HttpUtility.HtmlDecode(value);
            }
        }

        public bool Encoded
        {
            get;
            set;
        }

        public bool Filterable
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        public bool Groupable
        {
            get;
            set;
        }

        public IDictionary<string, object> HeaderHtmlAttributes
        {
            get;
            private set;
        }

        public IDictionary<string, object> FooterHtmlAttributes
        {
            get;
            private set;
        }

        private string PrepareStyle(string style)
        {
            if (string.IsNullOrEmpty(style))
            {
                return "display:none;";
            }
            else
            {
                var newStyle = Regex.Replace(style, "((.*)?display):([^;]*)", "$1:none", RegexOptions.IgnoreCase);
                if (newStyle == style)
                {
                    return "display:none;" + style;
                }

                return newStyle;
            }
        }

        private bool hidden;
        public bool Hidden
        {
            get
            {
                return hidden;
            }
            set 
            {
                if (value)
                {                    
                    HtmlAttributes["style"] = PrepareStyle(Convert.ToString(HtmlAttributes["style"]));                   
                }
                else if (HtmlAttributes.ContainsKey("style"))
                {
                    HtmlAttributes["style"] = ((string)HtmlAttributes["style"]).Replace("display:none;", "");
                }
                hidden = value;
            }
        }

        public bool IncludeInContextMenu
        {
            get;
            set;
        }

        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        public string Member
        {
            get
            {
                return member;
            }
            set
            {
                member = value;

                if (!Title.HasValue())
                {
                    Title = member.AsTitle();
                }
            }
        }

        public Type MemberType
        {
            get;
            set;
        }

        public bool ReadOnly
        {
            get;
            set;
        }

        public bool Sortable
        {
            get;
            set;
        }

        public string Title
        {
            get;
            set;
        }

        public bool Visible
        {
            get;
            set;
        }

        public string Width
        {
            get;
            set;
        }
    }
}
