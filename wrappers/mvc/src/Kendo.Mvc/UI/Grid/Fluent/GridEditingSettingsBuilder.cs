namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Extensions;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring grid editing.
    /// </summary>
    public class GridEditingSettingsBuilder<T> : IHideObjectMembers
        where T : class
    {
        private readonly GridEditableSettings<T> settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridEditingSettingsBuilder{T}"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridEditingSettingsBuilder(GridEditableSettings<T> settings)
        {
            this.settings = settings;
            this.settings.Enabled = true;
        }

        /// <summary>
        /// Enables or disables grid editing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Editable(settings => settings.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable grid editing on certain conditions.
        /// </remarks>
        public GridEditingSettingsBuilder<T> Enabled(bool value)
        {
            settings.Enabled = value;
            
            return this;
        }
    
        public GridEditingSettingsBuilder<T> Mode(GridEditMode mode)
        {
            settings.Mode = mode;

            return this;
        }
        //TODO: Implement GridBeginEditEvent option
        //public GridEditingSettingsBuilder<T> BeginEdit(GridBeginEditEvent value)
        //{
        //    settings.BeginEdit = value;

        //    return this;
        //}

        public GridEditingSettingsBuilder<T> Window(Action<WindowBuilder> configurator)
        {

            configurator(new WindowBuilder(settings.PopUp));

            return this;
        }        

        /// <summary>
        /// Specify an editor template which to be used for InForm or PopUp modes
        /// </summary>
        /// <param name="templateName">name of the editor template</param>
        /// <remarks>This settings is applicable only when Mode is
        /// <see cref="GridEditMode.PopUp"/></remarks>
        public GridEditingSettingsBuilder<T> TemplateName(string templateName)
        {

            settings.TemplateName = templateName;
            return this;
        }
        /// <summary>
        /// Provides additional view data in the editor template.
        /// </summary>
        /// <remarks>
        /// The additional view data will be provided if the editing mode is set to in-form or popup. For other editing modes 
        /// use <see cref="GridBoundColumnBuilder{T}.EditorViewData"/> 
        /// </remarks>
        /// <param name="additionalViewData">An anonymous object which contains the additional data</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Editable(editing => editing.AdditionalViewData(new { customers = Model.Customers }))
        /// %&gt;
        /// </code>
        /// </example>
        public GridEditingSettingsBuilder<T> AdditionalViewData(object additionalViewData)
        {
            settings.AdditionalViewData = additionalViewData;

            return this;
        }
        /// <summary>
        /// Enables or disables delete confirmation.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Editable(settings => settings.DisplayDeleteConfirmation(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridEditingSettingsBuilder<T> DisplayDeleteConfirmation(bool value)
        {
            settings.DisplayDeleteConfirmation = value;
            
            return this;
        }

        public GridEditingSettingsBuilder<T> DisplayDeleteConfirmation(string message)
        {
            settings.Confirmation = message;
            settings.DisplayDeleteConfirmation = true;

            return this;
        }

        /// <summary>
        /// Change default text for confirm delete button. Note: Available only on mobile devices.
        /// </summary>
        /// <remarks>
        /// Available only on mobile devices.
        /// </remarks>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Editable(settings => settings.ConfirmDelete("Yes"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridEditingSettingsBuilder<T> ConfirmDelete(string text)
        {
            settings.ConfirmDelete = text;            
            return this;
        }

        /// <summary>
        /// Change default text for cancel delete button. Note: Available only on mobile devices.
        /// </summary>
        /// <remarks>
        /// Available only on mobile devices.
        /// </remarks>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Editable(settings => settings.ConfirmDelete("No"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridEditingSettingsBuilder<T> CancelDelete(string text)
        {
            settings.CancelDelete = text;
            return this;
        }

        //TODO: Implement edit form attributes
        ///// <summary>
        ///// Gets the HTML attributes of the form rendered during editing
        ///// </summary>
        ///// <param name="attributes">The attributes.</param>
        //public GridEditingSettingsBuilder<T> FormHtmlAttributes(object attributes)
        //{
        //    return FormHtmlAttributes(attributes.ToDictionary());
        //}

        //TODO: Implement edit form attributes
        ///// <summary>
        ///// Gets the HTML attributes of the form rendered during editing
        ///// </summary>
        ///// <param name="attributes">The attributes.</param>
        //public GridEditingSettingsBuilder<T> FormHtmlAttributes(IDictionary<string, object> attributes)
        //{
        //    MergeAttributes(settings.FormHtmlAttributes, attributes);

        //    return this;
        //}
        
        private static void MergeAttributes(IDictionary<string, object> target, IDictionary<string, object> attributes)
        {

            target.Clear();
            target.Merge(attributes);
        }

        /// <summary>
        /// Sets insert row position.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Editable(settings => settings.CreateAt(GridInsertRowPosition.Bottom))
        /// %&gt;
        /// </code>
        /// </example>
        public GridEditingSettingsBuilder<T> CreateAt(GridInsertRowPosition position)
        {
            settings.CreateAt = position;

            return this;
        }
    }
}
