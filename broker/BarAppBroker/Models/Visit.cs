using System.Collections.Generic;

namespace BarAppBroker.Models
{
    public class Visit
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BarId { get; set; }
        public List<string> Items { get; set; }
        public List<float> Costs { get; set; }

        public override string ToString()
        {
            return $"{Id} {UserId} {BarId} {string.Join(" ", Items)} {string.Join(" ", Costs)}";
        }
    }
}
