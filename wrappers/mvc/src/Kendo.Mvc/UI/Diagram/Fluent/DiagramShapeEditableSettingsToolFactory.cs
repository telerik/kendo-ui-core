namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Editable for ASP.NET MVC
    /// </summary>
    public class DiagramShapeEditableSettingsToolFactory : IHideObjectMembers
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
        public virtual DiagramShapeEditableSettingsToolBuilder Custom()
        {
            var item = new DiagramShapeEditableSettingsTool();

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder Edit()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "edit" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the delete action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder Delete()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "delete" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the rotateClockwise action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder RotateClockwise()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "rotateClockwise" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the rotateAnticlockwise action.
        /// </summary>
        public virtual DiagramShapeEditableSettingsToolBuilder RotateAnticlockwise()
        {
            var item = new DiagramShapeEditableSettingsTool() { Name = "rotateAnticlockwise" };

            container.Add(item);

            return new DiagramShapeEditableSettingsToolBuilder(item);
        }
        //<< Factory methods
    }
}

