namespace KendoUI.Mvc.Infrastructure
{
    public interface ICacheFactory
    {
        ICache Create(string prefix);
    }
}
