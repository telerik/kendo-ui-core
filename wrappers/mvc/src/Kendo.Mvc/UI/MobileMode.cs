namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Mode of adaptive rendering 
    /// </summary>
    public enum MobileMode
    {
        /// <summary>
        /// Disables the mobile adaptive rendering
        /// </summary>
        Disabled = 0,
        /// <summary>
        /// Autodetect if rendered by a mobile browser
        /// </summary>
        Auto,
        /// <summary>
        /// Force mobile phone rendering
        /// </summary>
        Phone,
        /// <summary>
        /// Force mobile tablet rendering
        /// </summary>
        Tablet
    }
}
