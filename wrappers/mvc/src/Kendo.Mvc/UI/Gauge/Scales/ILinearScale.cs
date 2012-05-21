namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines a generic ILinearScale.
    /// </summary>
    public interface ILinearScale : IGaugeScale
    {
        /// <summary>
        /// The scale mirror.
        /// </summary>
        bool? Mirror { get; set; }
    }
}