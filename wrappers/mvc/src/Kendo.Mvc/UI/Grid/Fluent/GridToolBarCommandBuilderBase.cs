namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring toolbar command.
    /// </summary>
    /// <typeparam name="TModel">The type of the model</typeparam>
    /// <typeparam name="TCommand">The type of the command.</typeparam>
    /// <typeparam name="TBuilder">The type of the builder.</typeparam>
    public abstract class GridToolBarCommandBuilderBase<TModel, TCommand, TBuilder> : IHideObjectMembers
        where TModel : class
        where TCommand : GridActionCommandBase
        where TBuilder : GridToolBarCommandBuilderBase<TModel, TCommand, TBuilder>
    {
        protected GridToolBarCommandBuilderBase(TCommand command)
        {
            Command = command;
        }
        //TODO: Implement command button types
        /*
        /// <summary>
        /// Sets the button type.
        /// </summary>
        /// <param name="type">The button type.</param>
        /// <returns></returns>
        public TBuilder ButtonType(GridButtonType type)
        {

            Command.ButtonType = type;

            return this as TBuilder;
        }
        */
        public TBuilder Text(string text)
        {
            Command.Text = text;

            return this as TBuilder;
        }
        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public TBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public TBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {
            Command.HtmlAttributes.Merge(attributes);

            return this as TBuilder;
        }
        
        //TODO: Implement command button image html attributes
        ///// <summary>
        ///// Sets the image HTML attributes.
        ///// </summary>
        ///// <param name="attributes">The Image HTML attributes.</param>
        ///// <returns></returns>
        //public TBuilder ImageHtmlAttributes(object attributes)
        //{
        //    return ImageHtmlAttributes(attributes.ToDictionary());
        //}        
        
        ///// <summary>
        ///// Sets the image HTML attributes.
        ///// </summary>
        ///// <param name="attributes">The Image HTML attributes.</param>
        ///// <returns></returns>
        //public TBuilder ImageHtmlAttributes(IDictionary<string, object> attributes)
        //{
        //    Command.ImageHtmlAttributes.Merge(attributes);

        //    return this as TBuilder;
        //}

        protected TCommand Command
        {
            get;
            private set;
        }
    }
}