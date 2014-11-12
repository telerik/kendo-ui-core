namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Editable for ASP.NET MVC
    /// </summary>
    public class DiagramShapeEditableSettingsToolFactory<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly List<DiagramShapeEditableSettingsTool> container;

        public DiagramShapeEditableSettingsToolFactory(List<DiagramShapeEditableSettingsTool> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Custom()
        {
            var item = new DiagramShapeEditableSettingsTool();

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Edit()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "edit" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the delete action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Delete()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "delete" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the rotateClockwise action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel> RotateClockwise()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "rotateClockwise" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the rotateAnticlockwise action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel> RotateAnticlockwise()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "rotateAnticlockwise" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }
        //<< Factory methods
    }
}

