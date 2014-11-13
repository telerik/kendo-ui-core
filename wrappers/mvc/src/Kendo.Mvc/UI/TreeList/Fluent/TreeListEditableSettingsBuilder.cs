namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListEditableSettings settings.
    /// </summary>
    public class TreeListEditableSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListEditableSettings<T> container;

        public TreeListEditableSettingsBuilder(TreeListEditableSettings<T> settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The editing mode to use. The supported editing modes are "inline" and "popup".
        /// </summary>
        /// <param name="value">The value that configures the mode.</param>
        public TreeListEditableSettingsBuilder<T> Mode(string value)
        {
            container.Mode = value;

            return this;
        }
        
        /// <summary>
        /// The template which renders popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public TreeListEditableSettingsBuilder<T> Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public TreeListEditableSettingsBuilder<T> TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The EditorTemplate which to be rendered as editor.
        /// </summary>
        /// <param name="name">The name of the EditorTemplate</param>
        public TreeListEditableSettingsBuilder<T> TemplateName(string name)
        {
            container.TemplateName = name;

            return this;
        }
    }
}

