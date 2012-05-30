namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

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

        public GridToolBarCommandBuilder<T> Insert()
        {
            var command = new GridToolBarInsertCommand<T>();

            settings.Commands.Add(command);

            settings.Grid.Editing.Enabled = true;

            return new GridToolBarCommandBuilder<T>(command);
        }

        public GridToolBarSubmitChangesCommandBuilder<T> SubmitChanges()
        {
            var command = new GridToolBarSubmitChangesCommand<T>();

            settings.Commands.Add(command);

            settings.Grid.Editing.Enabled = true;

            return new GridToolBarSubmitChangesCommandBuilder<T>(command);
        }

        public GridToolBarCustomCommandBuilder<T> Custom()
        {
            var command = new GridToolBarCustomCommand<T>();

            settings.Commands.Add(command);

            return new GridToolBarCustomCommandBuilder<T>(command);
        }

        public void Template(Action template)
        {

            settings.Template.Content = template;
        }

        public void Template(string template)
        {

            settings.Template.Html = template;
        }

        public void Template(Action<Grid<T>> template)
        {

            settings.Template.Content = () => template(settings.Grid);
        }

        public void Template(Func<Grid<T>, object> template)
        {

            settings.Template.InlineTemplate = (obj) => template(settings.Grid);
        }
    }
}