using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace vizsgaremek
{
    public partial class szinek : Form
    {
        public szinek()
        {
            InitializeComponent();
        }

        private void buttonClick(object sender, EventArgs e)
        {
            ReaLTaiizor.Controls.Button btn = (ReaLTaiizor.Controls.Button)sender;
            KvizSzinek.selected = KvizSzinek.GetColorNameByRgb(btn.PressedColor);
            string colorName = KvizSzinek.selected.Key;
            string colorValue = KvizSzinek.selected.Value;
            Close();

            // itt választott egy színt. bezárni a menüt stb. innentől kezdve bárhol a kódban használhatod
            // a KvizSzinek.selected változót, ami KeyValuePair<string, string> típusú. a colorName a Key, a colorValue pedig az rgb.

        }
    }
}
