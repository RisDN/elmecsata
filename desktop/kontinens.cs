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
    public partial class kontinens : Form
    {
        int continentid;
        void betoltes()
        {
            rbhozzaadas.Checked = true;
            dgkontinens.Rows.Clear();
            string lekerdezes = "select * from continents";
            Adatbazis ab = new Adatbazis(lekerdezes);
            while (ab.Dr.Read())
            {
                dgkontinens.Rows.Add(ab.Dr["continent_id"], ab.Dr["continent"]);
            }
        }

        public kontinens()
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

        private void btmentes_Click(object sender, EventArgs e)
        {
            if (txkontinens.Text.Length == 0)
            {
                MessageBox.Show("Kötelező megadni a kontinenst!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txkontinens.Focus();
            }
            else if (rbhozzaadas.Checked)
            {
                string lekerdezes = "select count(continent) as kontinens from continents where continent='"+txkontinens.Text+"'";
                Adatbazis ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                int vane = Convert.ToInt16(ab.Dr["kontinens"]);
                ab.Lezaras();
                if (vane > 0)
                {
                    MessageBox.Show("Ilyen kontinens már létezik!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    txkontinens.Text = "";
                    txkontinens.Focus();
                }

                else
                {
                    lekerdezes = "insert into continents(continent) values('" + txkontinens.Text + "')";
                    ab = new Adatbazis(lekerdezes);
                    ab.Dr.Read();
                    ab.Lezaras();
                    MessageBox.Show("Sikeres Mentés!", "ÜZENET", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    txkontinens.Text = "";
                    txkontinens.Focus();
                }
            }
            else
            {
                string lekerdezes = "update continents set continent='"+txkontinens.Text+"' where continent_id='"+continentid+"'";
                Adatbazis ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                ab.Lezaras();
                MessageBox.Show("Sikeres módosítás!", "ÜZENET", MessageBoxButtons.OK, MessageBoxIcon.Information);
                txkontinens.Text = "";
            }
            betoltes();
        }

        private void dgkontinens_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (rbmodositas.Checked)
            {
                DataGridViewRow sor = dgkontinens.Rows[e.RowIndex];
                continentid = Convert.ToInt32(sor.Cells["continent_id"].Value);
                txkontinens.Text = sor.Cells["continent"].Value.ToString();
                pladatok.Visible = true;
            }
        }
    }
}
