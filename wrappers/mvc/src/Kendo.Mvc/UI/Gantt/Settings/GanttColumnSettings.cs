namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.Text.RegularExpressions;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttColumnSettings<T> : GanttColumnSettings
        where T : class
    {
        public Action<T> Template
        {
            get;
            set;
        }
    }
    
    public class GanttColumnSettings
    {
        private string member;

        public GanttColumnSettings()
        {
            Sortable = true;
        }

        public string Format
        {
            get;
            set;
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

        public bool? Editable
        {
            get;
            set;
        }

        public int? Width
        {
            get;
            set;
        }
    }
}
