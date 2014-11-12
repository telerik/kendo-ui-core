namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Editable for ASP.NET MVC
    /// </summary>
    public class DiagramShapeDefaultsEditableSettingsToolFactory : IHideObjectMembers
    {
        private readonly List<DiagramShapeDefaultsEditableSettingsTool> container;

        public DiagramShapeDefaultsEditableSettingsToolFactory(List<DiagramShapeDefaultsEditableSettingsTool> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual DiagramShapeDefaultsEditableSettingsToolBuilder Custom()
        {
            var item = new DiagramShapeDefaultsEditableSettingsTool();

            container.Add(item);

            return new DiagramShapeDefaultsEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual DiagramShapeDefaultsEditableSettingsToolBuilder Edit()
        {
            var item = new DiagramShapeDefaultsEditableSettingsTool() { Name = "edit" };

            container.Add(item);

            return new DiagramShapeDefaultsEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the delete action.
        /// </summary>
        public virtual DiagramShapeDefaultsEditableSettingsToolBuilder Delete()
        {
            var item = new DiagramShapeDefaultsEditableSettingsTool() { Name = "delete" };

            container.Add(item);

            return new DiagramShapeDefaultsEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the rotateClockwise action.
        /// </summary>
        public virtual DiagramShapeDefaultsEditableSettingsToolBuilder RotateClockwise()
        {
            var item = new DiagramShapeDefaultsEditableSettingsTool() { Name = "rotateClockwise" };

            container.Add(item);

            return new DiagramShapeDefaultsEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the rotateAnticlockwise action.
        /// </summary>
        public virtual DiagramShapeDefaultsEditableSettingsToolBuilder RotateAnticlockwise()
        {
            var item = new DiagramShapeDefaultsEditableSettingsTool() { Name = "rotateAnticlockwise" };

            container.Add(item);

            return new DiagramShapeDefaultsEditableSettingsToolBuilder(item);
        }
        //<< Factory methods
    }
}

