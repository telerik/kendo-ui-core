namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListColumnCommand settings.
    /// </summary>
    public class TreeListColumnCommandBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListColumnCommand container;

        public TreeListColumnCommandBuilder(TreeListColumnCommand settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The name of the command. The built-in commands are "edit", "createChild" and "destroy". When set to a custom value, it is rendered as a data-command attribute.
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public TreeListColumnCommandBuilder<T> Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// The text displayed by the command button. If not set the name option is used as the button text.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public TreeListColumnCommandBuilder<T> Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// The CSS class applied to the command button.
        /// </summary>
        /// <param name="value">The value that configures the classname.</param>
        public TreeListColumnCommandBuilder<T> ClassName(string value)
        {
            container.ClassName = value;

            return this;
        }
        
        /// <summary>
        /// The JavaScript function executed when the user clicks the command button. The function receives a jQuery Event as an argument.The function context (available via the this keyword) will be set to the grid instance.
        /// </summary>
        /// <param name="value">The value that configures the click action.</param>
        public TreeListColumnCommandBuilder<T> Click(Func<object, object> handler)
        {
            container.Click.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// The JavaScript function executed when the user clicks the command button. The function receives a jQuery Event as an argument.The function context (available via the this keyword) will be set to the grid instance.
        /// </summary>
        /// <param name="value">The value that configures the click action.</param>
        public TreeListColumnCommandBuilder<T> Click(string handler)
        {
            container.Click.HandlerName = handler;

            return this;
        }
        
        //<< Fields
    }
}

