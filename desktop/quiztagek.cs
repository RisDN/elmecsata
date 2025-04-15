using Org.BouncyCastle.Utilities.Collections;
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
    public partial class quiztagek : Form
    {
        int quiztagid;
        void betoltes()
        {
            rbhozzaadas.Checked = true;
            dgquiztag.Rows.Clear();
            string lekerdezes = "select * from quiz_tags";
            Adatbazis ab = new Adatbazis(lekerdezes);
            while (ab.Dr.Read())
            {
                dgquiztag.Rows.Add(ab.Dr["quiz_tag_id"], ab.Dr["tag"], ab.Dr["label"], ab.Dr["color"]);
            }
        }
        public quiztagek()
        {
            InitializeComponent();
            betoltes();
        }

        private void rbhozzaadas_CheckedChanged(object sender, EventArgs e)
        {
            if (rbhozzaadas.Checked)
            {
                pladatok.Visible = true;
            }
        }

        private void rbmodositas_CheckedChanged(object sender, EventArgs e)
        {
            if (rbmodositas.Checked)
            {
                pladatok.Visible = false;
            }
        }

        private void btelvet_Click(object sender, EventArgs e)
        {
            DialogResult uzenet = MessageBox.Show("Biztosan elveti?", "ÜZENET", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (uzenet == DialogResult.Yes)
            {
                Close();
            }
        }

        private void dgquiztag_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (rbmodositas.Checked)
            {
                DataGridViewRow sor = dgquiztag.Rows[e.RowIndex];
                quiztagid = Convert.ToInt32(sor.Cells["quiz_tag_id"].Value);
                txquiztag.Text = sor.Cells["tag"].Value.ToString();
                txfelirat.Text = sor.Cells["label"].Value.ToString();
                txszin.Text = sor.Cells["color"].Value.ToString();
                pladatok.Visible = true;
            }
        }

        private void btszin_Click(object sender, EventArgs e)
        {
            szinek szinekfrm = new szinek();
            szinekfrm.ShowDialog();
            txszin.Text = KvizSzinek.selected.Key;
        }

        private void btmentes_Click(object sender, EventArgs e)
        {
            if (txquiztag.Text.Length == 0)
            {
                MessageBox.Show("Kötelező a quiztaget megadni!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txquiztag.Focus();
            }
            else if (txfelirat.Text.Length == 0)
            {
                MessageBox.Show("Kötelező a feliratát megadni!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txfelirat.Focus();
            }
            else if(txszin.Text.Length == 0)
            {
                MessageBox.Show("Kötelező a színét kiválasztani!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txszin.Focus();
            }
            else if(rbhozzaadas.Checked)
            {
                string lekerdezes = "select count(tag) as db from quiz_tags where tag='" + txquiztag.Text + "'";
                Adatbazis ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                int vanetag = Convert.ToInt16(ab.Dr["db"]);
                ab.Lezaras();
                lekerdezes = "select count(label) as ldb from quiz_tags where label='" + txfelirat.Text + "'";
                ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                int vanelabel = Convert.ToInt16(ab.Dr["ldb"]);
                ab.Lezaras();
                if (vanetag > 0)
                {
                    MessageBox.Show("Ilyen quiztag már létezik!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    txquiztag.Text = "";
                    txquiztag.Focus();
                }
                else if (vanelabel > 0)
                {
                    MessageBox.Show("Ilyen felirat már létezik!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    txfelirat.Text = "";
                    txfelirat.Focus();
                }
                else
                {
                    lekerdezes = "insert into quiz_tags(tag,label,color) values('" + txquiztag.Text + "','" + txfelirat.Text + "','" + txszin.Text + "')";
                    ab = new Adatbazis(lekerdezes);
                    ab.Dr.Read();
                    MessageBox.Show("Sikeres Mentés!", "ÜZENET", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    txquiztag.Text = "";
                    txfelirat.Text = "";
                    txszin.Text = "";
                    txquiztag.Focus();
                } 
            }
            else
            {
                string lekerdezes = "update quiz_tags set tag='" + txquiztag.Text + "', label='" + txfelirat.Text + "', color='" + txszin.Text + "' where quiz_tag_id='" + quiztagid + "'";
                Adatbazis ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                ab.Lezaras();
                MessageBox.Show("Sikeres módosítás!", "ÜZENET", MessageBoxButtons.OK, MessageBoxIcon.Information);
                txquiztag.Text = "";
                txfelirat.Text = "";
                txszin.Text = "";
                txquiztag.Focus();
            }
            betoltes();
        }
    }
}
