using System.Collections;
namespace Kendo.Mvc.UI
{
    public interface IChartBulletSeries : IChartSeries
    {
        /// <summary>
        /// The data used for binding.
        /// </summary>
        IEnumerable Data
        {
            get;
            set;
        }

        /// <summary>
        /// The distance between category clusters.
        /// </summary>
        double? Gap
        {
            get;
            set;
        }

        /// <summary>
        /// Space between bullets.
        /// </summary>
        double? Spacing
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the bullets.
        /// </summary>
        ChartSeriesOrientation Orientation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the bullet's border
        /// </summary>
        ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the bullet's target
        /// </summary>
        ChartBulletTarget Target
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the effects overlay
        /// </summary>
        ChartBarSeriesOverlay Overlay
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model color member name.
        /// </summary>
        /// <value>The model color member name.</value>
        string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model current member name.
        /// </summary>
        /// <value>The model current member name.</value>
        string CurrentMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model target member name.
        /// </summary>
        /// <value>The model target member name.</value>
        string TargetMember
        {
            get;
            set;
        }
    }
}