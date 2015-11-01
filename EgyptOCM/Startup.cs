using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EgyptOCM.Startup))]
namespace EgyptOCM
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
