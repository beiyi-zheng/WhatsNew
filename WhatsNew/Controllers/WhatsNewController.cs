using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;

namespace WhatsNew.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WhatsNewController : ControllerBase
    {
        
        private readonly ILogger<WhatsNewController> _logger;

        public WhatsNewController(ILogger<WhatsNewController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<ContentViewModel> Get()
        {
            var data = new List<ContentViewModel>();

            using (var sr = new StreamReader(GetFilePath()))
            {
                // Read the stream as a string, and write the string to the console.
                var contents = sr.ReadToEnd();

                data.Add(new ContentViewModel()
                {
                    Id = 1,
                    Author = "beiyi.zheng",
                    Content = contents,
                    Name = "Release 22.2",
                    Status = "Published"
                });
            } 
            
            return data;
        }
        private string GetFilePath()
        {
            string assemblyPath = Assembly.GetExecutingAssembly().Location;
            string? assemblyDirectory = Path.GetDirectoryName(assemblyPath);
            string textPath = Path.Combine(assemblyDirectory!, "relaseNotes.txt");

            _logger.LogInformation(textPath);
            return textPath;
        }
    }
}