namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    //TODO: Implement GridBeginEditEvent option
    //public enum GridBeginEditEvent
    //{
    //    Auto,
    //    Click,
    //    DoubleClick
    //}

    public interface IGridEditingSettings
    {
        bool Enabled
        {
            get;
        }
    }

    public class GridEditableSettings<T> : JsonObject, IGridEditingSettings
        where T : class
    {
        private readonly IGrid grid;

        public GridEditableSettings(IGrid grid)
        {
            this.grid = grid;

            DisplayDeleteConfirmation = true;
            //TODO: Implement edit form attributes
            //  FormHtmlAttributes = new RouteValueDictionary();
            //TODO: Implement GridBeginEditEvent option
            //BeginEdit = GridBeginEditEvent.Auto;            

            DefaultDataItem = CreateDefaultItem;
            Confirmation = Messages.Grid_Confirmation;
            CreateAt = GridInsertRowPosition.Top;
        }

        //TODO: Implement GridBeginEditEvent option
        //public GridBeginEditEvent BeginEdit 
        //{ 
        //    get; 
        //    set; 
        //}

        public Window PopUp
        {
            get;
            set;
        }

        public string Confirmation
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

        public GridInsertRowPosition CreateAt
        {
            get;
            set;
        }
        //TODO: Implement edit form attributes
        ///// <summary>
        ///// Gets the HTML attributes of the form rendered during editing
        ///// </summary>
        ///// <value>The HTML attributes.</value>
        //public IDictionary<string, object> FormHtmlAttributes
        //{
        //    get; 
        //    private set; 
        //}        

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
                .Add("draggable", PopUp.Draggable)
                .Add("resizable", PopUp.ResizingSettings.Enabled);

            return result;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var editorHtml = grid.EditorHtml;

            if (editorHtml != null && IsClientBinding)
            {
                //editorHtml = editorHtml.Replace("%", "%25").Replace("<", "%3c").Replace(">", "%3e");                
                editorHtml = editorHtml.Trim()
                                .Replace("\r\n", string.Empty)
                                .Replace("</script>", "<\\/script>")
                                .Replace("jQuery(\"#", "jQuery(\"\\\\#")
                                .Replace("#", "\\#");
            }

            FluentDictionary.For(json)
                .Add("confirmation", Confirmation, () => DisplayDeleteConfirmation)
                .Add("mode", Mode.ToString().ToLowerInvariant())
                .Add("template", editorHtml, () => Mode != GridEditMode.InLine)
                //TODO: Implement GridBeginEditEvent option                
                //.Add("beginEdit", BeginEdit == GridBeginEditEvent.Click ? "click" : "dblclick", () => BeginEdit != GridBeginEditEvent.Auto)                               
                .Add("createAt", CreateAt.ToString().ToLower(), () => CreateAt != GridInsertRowPosition.Top)
                .Add("window", SerializePopUp(), () => Mode == GridEditMode.PopUp && grid.DataSource.Type == DataSourceType.Ajax)
                .Add("create", IsClientBinding)
                .Add("update", IsClientBinding)
                .Add("destroy", IsClientBinding);
        }

        private bool IsClientBinding
        {
            get
            {
                return grid.DataSource.Type == DataSourceType.Ajax;
            }
        }
    }

    public enum GridInsertRowPosition
    {
        Top,
        Bottom
    }
}
