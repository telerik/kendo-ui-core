// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Routing;
    using KendoUI.Mvc.Infrastructure;
    using Extensions;

    public interface IGridEditingSettings
    {
        bool Enabled
        {
            get;
        }
    }

    public class GridEditingSettings<T> : IGridEditingSettings, IClientSerializable
        where T : class
    {
        private readonly IGrid grid;

        public GridEditingSettings(IGrid grid)
        {
            this.grid = grid;

            DisplayDeleteConfirmation = true;
            FormHtmlAttributes = new RouteValueDictionary();
            BeginEdit = GridBeginEditEvent.Auto;
            InsertRowPosition = GridInsertRowPosition.Top;

            DefaultDataItem = CreateDefaultItem;
        }

        public GridBeginEditEvent BeginEdit 
        { 
            get; 
            set; 
        }

        public GridInsertRowPosition InsertRowPosition
        {
            get;
            set;
        }

        public Window PopUp
        {
            get;
            set;
        }

        public GridEditMode Mode
        {
            get;
            set;
        }

        public bool Enabled 
        { 
            get; 
            set; 
        }

        public bool DisplayDeleteConfirmation
        {
            get;
            set;
        }

        public Func<T> DefaultDataItem
        {
            get;
            set;
        }

#if MVC2 || MVC3

        public string TemplateName
        {
            get; 
            set;
        }

        public object AdditionalViewData 
        { 
            get;
            set; 
        }
#endif
        /// <summary>
        /// Gets the HTML attributes of the form rendered during editing
        /// </summary>
        /// <value>The HTML attributes.</value>
        public IDictionary<string, object> FormHtmlAttributes
        {
            get; 
            private set; 
        }

        public IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
#if MVC2 || MVC3
            var editorHtml = grid.EditorHtml;

            if (editorHtml != null)
            {
                editorHtml = editorHtml.Replace("%", "%25").Replace("<", "%3c").Replace(">", "%3e");
            }
#endif            
            FluentDictionary.For(result)
                .Add("confirmDelete", DisplayDeleteConfirmation, true)
                .Add("mode", Mode.ToString())
#if MVC2 || MVC3
                .Add("editor", editorHtml, () => Mode != GridEditMode.InLine)
                .Add("beginEdit", BeginEdit == GridBeginEditEvent.Click ? "click" : "dblclick", () => BeginEdit != GridBeginEditEvent.Auto)
                .Add("defaultDataItem", SerializeDefaultDataItem(), () => grid.IsClientBinding && DefaultDataItem() != null)
                .Add("insertRowPosition", InsertRowPosition.ToString().ToLower(), () => InsertRowPosition != GridInsertRowPosition.Top)
#endif
                .Add("popup", SerializePopUp(), () => Mode == GridEditMode.PopUp && grid.IsClientBinding);

            return result;
        }

        private object SerializeDefaultDataItem()
        {
            T dataItem = DefaultDataItem();
            if (!typeof(T).IsDataRow())
                return dataItem;

            if (typeof(T) == typeof(DataRow))
            {
                return (dataItem as DataRow).SerializeRow();
            }

            return (dataItem as DataRowView).SerializeRow();
        }

        private T CreateDefaultItem()
        {
            if (typeof(T) == typeof(DataRowView))
            {
                return new DataTable().DefaultView.AddNew() as T;
            }

            if (typeof(T) == typeof(DataRow))
            {
                return new DataTable().NewRow() as T;
            }

            return Activator.CreateInstance<T>();
        }

        private IDictionary<string, object> SerializePopUp()
        {
            var result = new Dictionary<string, object>();
            FluentDictionary.For(result)
                .Add("title", PopUp.Title, "")
                .Add("modal", PopUp.Modal)
                .Add("draggable", PopUp.Modal)
                .Add("resizable", PopUp.ResizingSettings.Enabled);

            return result;
        }

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (!Enabled)
            {
                return;
            }

            var editing = Serialize();

            if (editing.Any())
            {
                writer.AppendObject("editing", editing);
            }

            if (grid.IsClientBinding)
            {
                writer.AppendObject("dataKeys", grid.DataKeys.ToDictionary(dataKey => dataKey.Name, dataKey => (object)dataKey.RouteKey));
            }
        }
    }
  
    public enum GridInsertRowPosition
    {
        Top,
        Bottom
    }
}
