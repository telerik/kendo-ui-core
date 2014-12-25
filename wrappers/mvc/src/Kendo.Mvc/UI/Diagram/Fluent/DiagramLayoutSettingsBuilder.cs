namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramLayoutSettings settings.
    /// </summary>
    public class DiagramLayoutSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramLayoutSettings container;

        public DiagramLayoutSettingsBuilder(DiagramLayoutSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines where the circle/arc ends. The positive direction is clockwise and the angle is in degrees. This setting is specific to the radial tree layout.
        /// </summary>
        /// <param name="value">The value that configures the endradialangle.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> EndRadialAngle(double value)
        {
            container.EndRadialAngle = value;

            return this;
        }
        
        /// <summary>
        /// Each layout algorithm has a different set of parameters customizing the layout but they also all have a common collection of parameters which relate to the way 'pieces' of a diagram are organized.
		/// A diagram can have in general disconnected pieces, known as components, which can be organized in a way independent of the way a component on its own is arranged. In the picture above, this is one diagram consisting of four components.When you apply a certain layout an analysis will first split the diagram in components, arrange each component individually and thereafter organize the components in a grid. The common parameters referred above deal with this grid layout, they define the width, margin and padding of the (invisible) grid used to organize the components.
        /// </summary>
        /// <param name="configurator">The action that configures the grid.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> Grid(Action<DiagramLayoutGridSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramLayoutGridSettingsBuilder<TShapeModel,TConnectionModel>(container.Grid));
            return this;
        }
        
        /// <summary>
        /// Either the distance between the siblings if the tree is up/down or between levels if the tree is left/right. In tipOver tree layout this setting is used only for the direct children of the root
        /// </summary>
        /// <param name="value">The value that configures the horizontalseparation.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> HorizontalSeparation(double value)
        {
            container.HorizontalSeparation = value;

            return this;
        }
        
        /// <summary>
        /// The number of times that all the forces in the diagram are being calculated and balanced. The default is set at 300, which should be enough for diagrams up to a hundred nodes. By increasing this parameter you increase the correctness of the simulation but it does not always lead to a more stable topology. In some situations a diagram simply does not have a stable minimum energy state and oscillates (globally or locally) between the minima. In such a situation increasing the iterations will not result in a better topology.In situations where there is enough symmetry in the diagram the increased number of iterations does lead to a better layout. In the example below the 100 iterations was not enough to bring the grid to a stable state while 300 iterations did bring all the nodes in such a position that the (virtual) energy of the diagram is a minimum.This setting is specific to the force-directed layout
        /// </summary>
        /// <param name="value">The value that configures the iterations.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> Iterations(double value)
        {
            container.Iterations = value;

            return this;
        }
        
        /// <summary>
        /// The height (in a vertical layout) or width (in a horizontal layout) between the layers.
        /// </summary>
        /// <param name="value">The value that configures the layerseparation.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> LayerSeparation(double value)
        {
            container.LayerSeparation = value;

            return this;
        }
        
        /// <summary>
        /// In the force-directed layout this setting defines the optimal length between 2 nodes, which directly correlates to the state of the link between them. If a link is longer than there will be a force pulling the nodes together, if the link is shorter the force will push the nodes apart. The optimal length is more and indication in the algorithm than a guarantee that all nodes will be at this distance. The result of the layout is really a combination of the incidence structure of the diagram, the initial topology (positions of the nodes) and the number of iterations.In the layered layout it defines the minimum distance between nodes on the same level. Due to the nature of the algorithm this distance will only be respected if the the whole crossing of links and optimimzation does not induce a shift of the siblings.This setting is specific to the force-directed layout and layered layout
        /// </summary>
        /// <param name="value">The value that configures the nodedistance.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> NodeDistance(double value)
        {
            container.NodeDistance = value;

            return this;
        }
        
        /// <summary>
        /// Controls the distance between the root and the immediate children of the root. This setting is specific to the radial tree layout.
        /// </summary>
        /// <param name="value">The value that configures the radialfirstlevelseparation.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> RadialFirstLevelSeparation(double value)
        {
            container.RadialFirstLevelSeparation = value;

            return this;
        }
        
        /// <summary>
        /// Defines the radial separation between the levels (except the first one which is defined by the aforementioned radialFirstLevelSeparation). This setting is specific to the radial tree layout.
        /// </summary>
        /// <param name="value">The value that configures the radialseparation.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> RadialSeparation(double value)
        {
            container.RadialSeparation = value;

            return this;
        }
        
        /// <summary>
        /// Defines where the circle/arc starts. The positive direction is clockwise and the angle is in degrees. This setting is specific to the radial tree layout.
        /// </summary>
        /// <param name="value">The value that configures the startradialangle.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> StartRadialAngle(double value)
        {
            container.StartRadialAngle = value;

            return this;
        }
        
        /// <summary>
        /// Defines the horizontal offset from a child with respect to its parent. This setting is specific to the tipOver tree layout.
        /// </summary>
        /// <param name="value">The value that configures the underneathhorizontaloffset.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> UnderneathHorizontalOffset(double value)
        {
            container.UnderneathHorizontalOffset = value;

            return this;
        }
        
        /// <summary>
        /// Defines the vertical separation between siblings and sub-branches. This setting is specific to the tipOver tree layout.
        /// </summary>
        /// <param name="value">The value that configures the underneathverticalseparation.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> UnderneathVerticalSeparation(double value)
        {
            container.UnderneathVerticalSeparation = value;

            return this;
        }
        
        /// <summary>
        /// Defines the vertical separation between a parent and its first child. This offsets the whole set of children with respect to its parent. This setting is specific to the tipOver tree layout.
        /// </summary>
        /// <param name="value">The value that configures the underneathverticaltopoffset.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> UnderneathVerticalTopOffset(double value)
        {
            container.UnderneathVerticalTopOffset = value;

            return this;
        }
        
        /// <summary>
        /// Either the distance between levels if the tree is up/down or between siblings if the tree is left/right. This property is not used in tipOver tree layout but rather replaced with three additional ones - underneathVerticalTopOffset, underneathVerticalSeparation and underneathHorizontalOffset
        /// </summary>
        /// <param name="value">The value that configures the verticalseparation.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> VerticalSeparation(double value)
        {
            container.VerticalSeparation = value;

            return this;
        }
        
        /// <summary>
        /// The layout type.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> Type(DiagramLayoutType value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// The layout subtype.
        /// </summary>
        /// <param name="value">The value that configures the subtype.</param>
        public DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel> Subtype(DiagramLayoutSubtype value)
        {
            container.Subtype = value;

            return this;
        }
        
        //<< Fields
    }
}

