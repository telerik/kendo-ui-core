namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring toolbar command.
    /// </summary>
    /// <typeparam name="TModel">The type of the model</typeparam>
    /// <typeparam name="TCommand">The type of the command.</typeparam>
    /// <typeparam name="TBuilder">The type of the builder.</typeparam>
    public class GridToolBarCommandFactory<T> : IHideObjectMembers where T : class
    {
        private readonly GridToolBarSettings<T> settings;

        public GridToolBarCommandFactory(GridToolBarSettings<T> settings)
        {
            this.settings = settings;
        }

        //TODO: Implement Toolbar positioning
        //public GridToolBarCommandFactory<T> Position(GridToolBarPosition value)
        //{
        //    settings.Position = value;

        //    return this;
        //}

        /// <summary>
        /// Defines a create command.
        /// </summary>
        /// <returns></returns>
        public GridToolBarCommandBuilder<T> Create()
        {
            var command = new GridToolBarCreateCommand<T>();

            settings.Commands.Add(command);

            settings.Grid.Editable.Enabled = true;

            return new GridToolBarCommandBuilder<T>(command);
        }

        /// <summary>
        /// Defines a save command.
        /// </summary>
        public GridToolBarSaveCommandBuilder<T> Save()
        {
            var command = new GridToolBarSaveCommand<T>();

            settings.Commands.Add(command);

            settings.Grid.Editable.Enabled = true;

            return new GridToolBarSaveCommandBuilder<T>(command);
        }

        /// <summary>
        /// Defines a custom command.
        /// </summary>
        public GridToolBarCustomCommandBuilder<T> Custom()
        {
            var command = new GridToolBarCustomCommand<T>();

            settings.Commands.Add(command);

            return new GridToolBarCustomCommandBuilder<T>(command);
        }

        /// <summary>
        /// Sets toolbar template.
        /// </summary>
        /// <param name="templateAction">The action defining the template.</param>
        public void Template(Action template)
        {

            settings.Template.Content = template;
        }

        /// <summary>
        /// Sets toolbar template.
        /// </summary>
        /// <param name="template">The template</param>
        public void Template(string template)
        {

            settings.Template.Html = template;
        }

        /// <summary>
        /// Sets the toolbar template.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public void Template(Action<Grid<T>> template)
        {

            settings.Template.Content = () => template(settings.Grid);
        }

        /// <summary>
        /// Sets the toolbar template.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public void Template(Func<Grid<T>, object> template)
        {
            settings.Template.InlineTemplate = (obj) => template(settings.Grid);
        }
    }
}