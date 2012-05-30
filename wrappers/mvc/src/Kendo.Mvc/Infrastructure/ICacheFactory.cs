namespace Kendo.Mvc.Infrastructure
{
    public interface ICacheFactory
    {
        ICache Create(string prefix);
    }
}
