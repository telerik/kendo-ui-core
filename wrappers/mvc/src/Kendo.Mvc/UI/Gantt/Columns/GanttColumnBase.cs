namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infrastructure;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;
    using System.Web;
    using System.Web.Util;

    /// <summary>
    /// The base class for all columns in Kendo Gantt for ASP.NET MVC.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class GanttColumnBase<TTaskModel> : JsonObject, IGanttColumn
        where TTaskModel : class, IGanttTask
    {
        public string Format
        {
            get
            {
                return Settings.Format;
            }
            set
            {
                Settings.Format = value;
            }
        }
        
        public string EditorHtml
        {
            get;
            set;
        }

        protected GanttColumnBase()
        {
            Settings = new GanttColumnSettings();
        }

        /// <summary>
        /// Gets the member of the column.
        /// </summary>
        /// <value>The member.</value>
        public string Member
        {
            get
            {
                return Settings.Member;
            }
            
            set
            {
                Settings.Member = value;
            }
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Title.HasValue())
            {
                json["title"] = Title;
            }

            if (Width.HasValue)
            {
                json["width"] = Width;
            }

            if (Editable.HasValue)
            {
                json["editable"] = Editable.Value;
            }
        }       
        
        /// <summary>
        /// Gets or sets the title of the column.
        /// </summary>
        /// <value>The title.</value>
        public virtual string Title
        {
            get
            {
                return Settings.Title;
            }
            set
            {
                Settings.Title = value;
            }
        }

        /// <summary>
        /// Gets or sets whether the column is editable
        /// </summary>
        /// <value>Whether the column is editable.</value>
        public virtual bool? Editable
        {
            get
            {
                return Settings.Editable;
            }
            set
            {
                Settings.Editable = value;
            }
        }

        internal GanttColumnSettings Settings
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the width of the column.
        /// </summary>
        /// <value>The width.</value>
        public int? Width
        {
            get
            {
                return Settings.Width;
            }
            set
            {
                Settings.Width = value;
            }
        }
    }
}
