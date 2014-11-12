namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Editable for ASP.NET MVC
    /// </summary>
    public class DiagramConnectionEditableSettingsToolFactory : IHideObjectMembers
    {
        private readonly List<DiagramConnectionEditableSettingsTool> container;

        public DiagramConnectionEditableSettingsToolFactory(List<DiagramConnectionEditableSettingsTool> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual DiagramConnectionEditableSettingsToolBuilder Custom()
        {
            var item = new DiagramConnectionEditableSettingsTool();

            container.Add(item);

            return new DiagramConnectionEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual DiagramConnectionEditableSettingsToolBuilder Edit()
        {
            var item = new DiagramConnectionEditableSettingsTool() { Name = "edit" };

            container.Add(item);

            return new DiagramConnectionEditableSettingsToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the delete action.
        /// </summary>
        public virtual DiagramConnectionEditableSettingsToolBuilder Delete()
        {
            var item = new DiagramConnectionEditableSettingsTool() { Name = "delete" };

            container.Add(item);

            return new DiagramConnectionEditableSettingsToolBuilder(item);
        }
        //<< Factory methods
    }
}

