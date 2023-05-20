using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace WhatsNew.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<ContentViewModel> Get()
        {
            var data = new List<ContentViewModel>();

            var contents = new StringBuilder();
            contents.AppendLine("Referral Management Training:");
            contents.AppendLine("Click on Referral Management Training to access Referral Management and Referral Management with Discharge Planning Online Training Videos and Documentation.");

            contents.AppendLine("<p></p>");
            contents.AppendLine("Action Required: Update your free CarePort Guide profile!");
            contents.AppendLine("Discharge planners are using CarePort Guide to find the best post-acute care. It is an easy, no cost way to share details about your organization with patients and families. Questions? Contact us at <a href='mailto:onboarding@careporthealth.com'>onboarding@careporthealth.com</a>.");

            contents.AppendLine("<p></p>");
            contents.AppendLine("CM 23.1 Release Update:");
            contents.AppendLine("Click here to read more about the upcoming new features in Care Management.\r\nClick here to read more about the upcoming new features in Referral Management.\r\n");
           
            contents.AppendLine("<p></p>");
            contents.AppendLine("CM 22.2.1 Release Update:");
            contents.AppendLine("<p>Click on the <a href=\"https://info.wellsky.com/CareManagment23.1Releases_ReferralManagement22.2Release.html\" title=\"https://info.wellsky.com/CareManagment23.1Releases_ReferralManagement22.2Release.html\" target=\"_blank\">22.2.1 Referral Management Release Notes</a>.</p><p>Click on the <a href=\"https://info.wellsky.com/CareManagment23.1Releases_CareManagementLandingPage22.2Release.html\" title=\"https://info.wellsky.com/CareManagment23.1Releases_CareManagementLandingPage22.2Release.html\" target=\"_blank\">22.2.1 Care Management Release Notes</a>. </p>");

            var draftConnents = new StringBuilder();
            draftConnents.Append(contents);
            draftConnents.AppendLine("<p></p>");
            draftConnents.AppendLine("CM 22.2.2 Release Update:");
            draftConnents.AppendLine("Click on the 22.2 Care Management Release Notes and SES.\r\nClick on the 22.2 Referral Management Release Notes and SES.\r\nClick here to read more about the upcoming new features in Care Management.\r\nClick on the 22.2 CM Data Dictionary.\r\nClick here to read more about the upcoming new features in Referral Management.\r\nClick on the 22.2 RM Data Dictionary.");

            data.Add(new ContentViewModel()
            {
                Id = 1,
                Author = "beiyi.zheng",
                Content = contents.ToString(),
                Name = "Release 22.2",
                Status = "Published"
            });

            data.Add(new ContentViewModel()
            {
                Id = 2,
                Author = "beiyi.zheng",
                Content = draftConnents.ToString(),
                Name = "Release 22.3",
                Status="Draft"
            });
            return data;
        }
    }
}