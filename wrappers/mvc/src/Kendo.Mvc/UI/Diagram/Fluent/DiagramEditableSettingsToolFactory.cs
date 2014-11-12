namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Editable for ASP.NET MVC
    /// </summary>
    public class DiagramEditableSettingsToolFactory<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly List<DiagramEditableSettingsTool> container;

        public DiagramEditableSettingsToolFactory(List<DiagramEditableSettingsTool> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Custom()
        {
            var item = new DiagramEditableSettingsTool();

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Edit()
        {
            var item = new DiagramEditableSettingsTool() { Name = "edit" };

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the createShape action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> CreateShape()
        {
            var item = new DiagramEditableSettingsTool() { Name = "createShape" };

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the createConnection action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> CreateConnection()
        {
            var item = new DiagramEditableSettingsTool() { Name = "createConnection" };

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the undo action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Undo()
        {
            var item = new DiagramEditableSettingsTool() { Name = "undo" };

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the redo action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Redo()
        {
            var item = new DiagramEditableSettingsTool() { Name = "redo" };

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the rotateClockwise action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> RotateClockwise()
        {
            var item = new DiagramEditableSettingsTool() { Name = "rotateClockwise" };

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the rotateAnticlockwise action.
        /// </summary>
        public virtual DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel> RotateAnticlockwise()
        {
            var item = new DiagramEditableSettingsTool() { Name = "rotateAnticlockwise" };

            container.Add(item);

            return new DiagramEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }
        //<< Factory methods
    }
}

