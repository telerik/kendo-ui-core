namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListMessagesCommandsSettings settings.
    /// </summary>
    public class TreeListMessagesCommandsSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListMessagesCommandsSettings container;

        public TreeListMessagesCommandsSettingsBuilder(TreeListMessagesCommandsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the text of "Edit" button that shows the editable fields for the row.
        /// </summary>
        /// <param name="value">The value that configures the edit.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Edit(string value)
        {
            container.Edit = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Update" button that applies the changes during editing.
        /// </summary>
        /// <param name="value">The value that configures the update.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Update(string value)
        {
            container.Update = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Cancel" button that discards the changes during editing.
        /// </summary>
        /// <param name="value">The value that configures the canceledit.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Canceledit(string value)
        {
            container.Canceledit = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Add new record" button that adds new data rows.
        /// </summary>
        /// <param name="value">The value that configures the create.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Create(string value)
        {
            container.Create = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Add child record" button that adds new child data rows.
        /// </summary>
        /// <param name="value">The value that configures the createchild.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Createchild(string value)
        {
            container.Createchild = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Delete" button that deletes a data row.
        /// </summary>
        /// <param name="value">The value that configures the destroy.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Destroy(string value)
        {
            container.Destroy = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Export to Excel" button that exports the widget data in spreadsheet format.
        /// </summary>
        /// <param name="value">The value that configures the excel.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Excel(string value)
        {
            container.Excel = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Export to PDF" button that exports the widget data in PDF format.
        /// </summary>
        /// <param name="value">The value that configures the pdf.</param>
        public TreeListMessagesCommandsSettingsBuilder<T> Pdf(string value)
        {
            container.Pdf = value;

            return this;
        }
        
        //<< Fields
    }
}

