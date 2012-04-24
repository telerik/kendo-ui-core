namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Container of scriptable component.
    /// </summary>
    public interface IScriptableComponentContainer
    {
        /// <summary>
        /// Registers the specified component.
        /// </summary>
        /// <param name="component">The component.</param>
        void Register(IScriptableComponent component);
    }
}