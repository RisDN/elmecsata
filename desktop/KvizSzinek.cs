using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vizsgaremek
{
    internal class KvizSzinek
    {

        public static Dictionary<string, string> colors = new Dictionary<string, string>()
            {
                { "physics", "51 51 204" },
                { "math", "51 102 153" },
                { "chemistry", "153 51 153" },
                { "biology", "57 146 57" },
                { "history", "204 102 51" },
                { "geography", "153 153 51" },
                { "literature", "153 102 102" },
                { "programming", "51 102 204" },
                { "art", "153 51 153" },
                { "music", "204 51 102" },
                { "sports", "51 153 51" },
                { "movies", "204 102 51" },
                { "tv", "204 204 51" },
                { "games", "51 204 204" },
                { "animals", "89 178 89" },
                { "food", "204 51 51" },
                { "drinks", "51 204 153" },
                { "travel", "102 153 204" },
                { "nature", "102 153 48" },
                { "science", "102 51 204" },
                { "technology", "51 102 153" },
                { "vehicles", "178 51 51" },
                { "space", "102 51 153" },
                { "mythology", "102 51 102" },
                { "religion", "153 102 102" },
                { "politics", "178 51 51" }
            };


        public static KeyValuePair<string, string> GetColorNameByRgb(Color color)
        {
            string name = $"{color.R.ToString()} {color.G.ToString()} {color.B.ToString()}";
            string c = colors.FirstOrDefault(x => x.Value == name).Key;
            KeyValuePair<string, string> newKeyValuePair = new KeyValuePair<string, string>(c, name);
            return newKeyValuePair;
        }

        public static KeyValuePair<string, string> selected;
    }
}
