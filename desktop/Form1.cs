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
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void cyberButton1_Click(object sender, EventArgs e)
        {
            quiztagek quiztagfrm = new quiztagek();
            quiztagfrm.ShowDialog();
        }

        private void cyberButton2_Click(object sender, EventArgs e)
        {
            kontinens kontinensfrm = new kontinens();
            kontinensfrm.ShowDialog();
        }

        private void btorszagok_Click(object sender, EventArgs e)
        {
            orszagok orszagokfrm = new orszagok();
            orszagokfrm.ShowDialog();
        }


    }
}
