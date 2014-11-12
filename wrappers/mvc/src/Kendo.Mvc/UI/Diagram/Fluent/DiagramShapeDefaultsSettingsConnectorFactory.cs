namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo ShapeDefaults for ASP.NET MVC
    /// </summary>
    public class DiagramShapeDefaultsSettingsConnectorFactory<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly List<DiagramShapeDefaultsSettingsConnector> container;

        public DiagramShapeDefaultsSettingsConnectorFactory(List<DiagramShapeDefaultsSettingsConnector> container)
        {
            this.container = container;
        }

        public virtual DiagramShapeDefaultsSettingsConnectorBuilder<TShapeModel, TConnectionModel> Add()
        {
            var item = new DiagramShapeDefaultsSettingsConnector();

            container.Add(item);

            return new DiagramShapeDefaultsSettingsConnectorBuilder<TShapeModel, TConnectionModel>(item);
        }
    }
}

