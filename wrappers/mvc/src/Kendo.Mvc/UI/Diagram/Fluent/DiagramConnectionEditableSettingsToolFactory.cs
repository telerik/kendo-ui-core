namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Editable for ASP.NET MVC
    /// </summary>
    public class DiagramConnectionEditableSettingsToolFactory<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
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
        public virtual DiagramConnectionEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Custom()
        {
            var item = new DiagramConnectionEditableSettingsTool();

            container.Add(item);

            return new DiagramConnectionEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual DiagramConnectionEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Edit()
        {
            var item = new DiagramConnectionEditableSettingsTool() { Name = "edit" };

            container.Add(item);

            return new DiagramConnectionEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }

        /// <summary>
        /// Adds an item for the delete action.
        /// </summary>
        public virtual DiagramConnectionEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Delete()
        {
            var item = new DiagramConnectionEditableSettingsTool() { Name = "delete" };

            container.Add(item);

            return new DiagramConnectionEditableSettingsToolBuilder<TShapeModel,TConnectionModel>(item);
        }
        //<< Factory methods
    }
}

