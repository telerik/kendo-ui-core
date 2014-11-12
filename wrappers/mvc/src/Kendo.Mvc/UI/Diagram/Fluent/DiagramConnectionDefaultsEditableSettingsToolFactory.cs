namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Editable for ASP.NET MVC
    /// </summary>
    public class DiagramConnectionDefaultsEditableSettingsToolFactory<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly List<DiagramConnectionDefaultsEditableSettingsTool> container;

        public DiagramConnectionDefaultsEditableSettingsToolFactory(List<DiagramConnectionDefaultsEditableSettingsTool> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Custom()
        {
            var item = new DiagramConnectionDefaultsEditableSettingsTool();

            container.Add(item);

            return new DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Edit()
        {
            var item = new DiagramConnectionDefaultsEditableSettingsTool() { Name = "edit" };

            container.Add(item);

            return new DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the delete action.
        /// </summary>
        public virtual DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Delete()
        {
            var item = new DiagramConnectionDefaultsEditableSettingsTool() { Name = "delete" };

            container.Add(item);

            return new DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }
        //<< Factory methods
    }
}

