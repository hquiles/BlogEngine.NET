<%@ Application Language="C#" %>
<%@ Import Namespace="BlogEngine.NET.App_Start" %>
<%@ Import Namespace="System.Threading" %>
<%@ Import Namespace="System.Net" %>

<script RunAt="server">
    void Application_BeginRequest(object sender, EventArgs e)
    {
        var app = (HttpApplication)sender;
        BlogEngineConfig.Initialize(app.Context);
    }

    void Application_PreRequestHandlerExecute(object sender, EventArgs e)
    {
        BlogEngineConfig.SetCulture(sender, e);
    }

    private static void _SetupRefreshJob()
    {

        //remove a previous job
        Action remove = HttpContext.Current.Cache["Refresh"] as Action;
        if (remove is Action)
        {
            HttpContext.Current.Cache.Remove("Refresh");
            remove.EndInvoke(null);
        }

        //get the worker
        Action work = () =>
        {
            while (true)
            {
                Thread.Sleep(60000);
                //TODO: Refresh Code (Explained in a moment)
                WebClient refresh = new WebClient();
                try
                {
                    refresh.UploadString("http://www.cryingstones.net/", string.Empty);
                }
                catch (Exception ex)
                {
                    //snip...
                }
                finally
                {
                    refresh.Dispose();
                }
            }
        };
        work.BeginInvoke(null, null);

        //add this job to the cache
        HttpContext.Current.Cache.Add(
            "Refresh",
            work,
            null,
            Cache.NoAbsoluteExpiration,
            Cache.NoSlidingExpiration,
            CacheItemPriority.Normal,
            (s, o, r) => { _SetupRefreshJob(); }
            );
    }
</script>
