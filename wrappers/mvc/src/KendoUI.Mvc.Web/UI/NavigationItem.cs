// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Web.Routing;
    using System.Collections.Generic;
    using System.Web.Script.Serialization;

    using Infrastructure;
    
    public abstract class NavigationItem<T> : LinkedObjectBase<T>, INavigatable, IHideObjectMembers, IHtmlAttributesContainer, IContentContainer where T : NavigationItem<T>
    {
        private string text;
        private string routeName;
        private string controllerName;
        private string actionName;
        private string url;

        private bool selected;
        private bool enabled;

        protected NavigationItem()
        {
            Template = new HtmlTemplate();
            HtmlAttributes = new RouteValueDictionary();
            ImageHtmlAttributes = new RouteValueDictionary();
            LinkHtmlAttributes = new RouteValueDictionary();
            RouteValues = new RouteValueDictionary();
            ContentHtmlAttributes = new RouteValueDictionary();
            Visible = true;
            Enabled = true;
            Encoded = true;
        }

        [ScriptIgnore]
        public RouteValueDictionary RouteValues 
        { 
            get; 
            set; 
        }

        [ScriptIgnore]
        public IDictionary<string, object> HtmlAttributes 
        { 
            get; 
            private set; 
        }

        [ScriptIgnore]
        public IDictionary<string, object> ImageHtmlAttributes 
        { 
            get; 
            private set; 
        }

        [ScriptIgnore]
        public IDictionary<string, object> LinkHtmlAttributes 
        { 
            get; 
            private set; 
        }

        [ScriptIgnore]
        public IDictionary<string, object> ContentHtmlAttributes 
        { 
            get; 
            private set; 
        }

        public bool Encoded 
        { 
            get; 
            set; 
        }

        [ScriptIgnore]
        public HtmlTemplate Template
        {
            get;
            private set;
        }

        [ScriptIgnore]
        public string Html
        {
            get
            {
                return Template.Html;
            }
            set
            {
                Template.Html = value;
            }
        }

        [ScriptIgnore]
        public bool Visible 
        { 
            get; 
            set; 
        }

        public string ImageUrl 
        { 
            get; 
            set; 
        }

        public string SpriteCssClasses 
        { 
            get; 
            set; 
        }

        [ScriptIgnore]
        public Action Content
        {
            get
            {
                return Template.Content;
            }
            set
            {
                Template.Content = value;
            }
        }

        public string Text
        {
            get
            {
                return text;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                text = value;
            }
        }

        public bool Selected
        {
            get
            {
                return selected;
            }
            set
            {
                selected = value;

                if (selected)
                {
                    enabled = true;
                }
            }
        }

        public bool Enabled
        {
            get
            {
                return enabled;
            }
            set
            {
                enabled = value;

                if (!enabled)
                {
                    selected = false;
                }
            }
        }

        [ScriptIgnore]
        public string ControllerName
        {
            get
            {
                return controllerName;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                controllerName = value;

                routeName = url = null;
            }
        }

        [ScriptIgnore]
        public string ActionName
        {
            get
            {
                return actionName;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                actionName = value;

                routeName = url = null;
            }
        }

        [ScriptIgnore]
        public string RouteName
        {
            get
            {
                return routeName;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                routeName = value;
                controllerName = actionName = url = null;
            }
        }

        public string Url
        {
            get
            {
                return url;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                url = value;

                routeName = controllerName = actionName = null;
                RouteValues.Clear();
            }
        }
    }
}