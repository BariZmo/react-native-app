using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BarAppBroker
{
    [Route("[controller]")]
    [ApiController]
    public class UserRatingController : ControllerBase
    {
        // GET: UserRating/5
        [HttpGet("{id}")]
        public double Get(int id)
        {
            var ratings = new RatingController().Get().Where(rating => rating.RatedEntityRole == "User" && rating.RatedEntityId == id);
            if (ratings.Any())
                return ratings.Average(rating => rating.Score);
            else
                return 0;
        }
    }
}
