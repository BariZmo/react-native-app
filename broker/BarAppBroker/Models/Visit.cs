using System.Collections.Generic;
using System.Linq;

namespace BarAppBroker.Models
{
    public class Visit
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BarId { get; set; }
        public List<(string, float)> Items { get; set; }

        public override string ToString()
        {
            return $"{Id} {UserId} {BarId} {string.Join(" ", Items.Select(item => $"{item.Item1}: {item.Item2}"))}";
        }
    }
}
