// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace KendoUI.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Extensions;
    using KendoUI.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring grid editing.
    /// </summary>
    public class GridEditingSettingsBuilder<T> : IHideObjectMembers
        where T : class
    {
        private readonly GridEditingSettings<T> settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridEditingSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridEditingSettingsBuilder(GridEditingSettings<T> settings)
        {
            this.settings = settings;
            this.settings.Enabled = true;
        }

        /// <summary>
        /// Enables or disables grid editing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
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

        public GridEditingSettingsBuilder<T> InsertRowPosition(GridInsertRowPosition position)
        {
            settings.InsertRowPosition = position;

            return this;
        }

        public GridEditingSettingsBuilder<T> Mode(GridEditMode mode)
        {
            settings.Mode = mode;

            return this;
        }

        public GridEditingSettingsBuilder<T> BeginEdit(GridBeginEditEvent value)
        {
            settings.BeginEdit = value;

            return this;
        }

        public GridEditingSettingsBuilder<T> Window(Action<WindowBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new WindowBuilder(settings.PopUp));

            return this;
        }

#if MVC2 || MVC3

        public GridEditingSettingsBuilder<T> DefaultDataItem(T value)
        {
            Guard.IsNotNull(value, "value");

            settings.DefaultDataItem = () => value;

            return this;
        }

        /// <summary>
        /// Specify an editor template which to be used for InForm or PopUp modes
        /// </summary>
        /// <param name="templateName">name of the editor template</param>
        /// <remarks>This settings is applicable only when Mode is <see cref="GridEditMode.InForm"/> 
        /// or <see cref="GridEditMode.PopUp"/></remarks>
        public GridEditingSettingsBuilder<T> TemplateName(string templateName)
        {
            Guard.IsNotNullOrEmpty(templateName, "templateName");

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
        ///  &lt;%= Html.Telerik().Grid(Model)
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
#endif
        /// <summary>
        /// Enables or disables delete confirmation.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
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

        /// <summary>
        /// Gets the HTML attributes of the form rendered during editing
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        public GridEditingSettingsBuilder<T> FormHtmlAttributes(object attributes)
        {
            return FormHtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Gets the HTML attributes of the form rendered during editing
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        public GridEditingSettingsBuilder<T> FormHtmlAttributes(IDictionary<string, object> attributes)
        {
            MergeAttributes(settings.FormHtmlAttributes, attributes);

            return this;
        }
        
        private static void MergeAttributes(IDictionary<string, object> target, IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            target.Clear();
            target.Merge(attributes);
        }
    }
}
