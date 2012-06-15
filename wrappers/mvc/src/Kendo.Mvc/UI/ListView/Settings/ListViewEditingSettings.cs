namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Data;
    using System;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;

    public interface IListViewEditingSettings
    {
        bool Enabled
        {
            get;
        }
    }

    public class ListViewEditingSettings<T> : IListViewEditingSettings where T : class
    {        
        public ListViewEditingSettings()
        {            
            DefaultDataItem = CreateDefaultItem;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public Func<T> DefaultDataItem
        {
            get;
            set;
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
    }
}