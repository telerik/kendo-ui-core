namespace Kendo.Mvc.UI
{
    public class EffectsBuilderFactory : IEffectsBuilderFactory
    {
        public EffectsBuilder Create(IEffectContainer container)
        {
            return new EffectsBuilder(container);
        }
    }
}
