using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Text.RegularExpressions;

namespace vizsgaremek
{
    
    public partial class orszagok : Form
    {
        int countryid;
        void betoltes()
        {
            rbhozzaadas.Checked = true;
            dgorszagok.Rows.Clear();
            cbkontinens.Items.Clear();
            string lekerdezes = "select countries.country_id, countries.continent, countries.country, countries.country_code, continents.continent as Kontinens from countries inner join continents ON countries.continent = continents.continent_id;";
            Adatbazis ab = new Adatbazis(lekerdezes);
            while (ab.Dr.Read())
            {
                dgorszagok.Rows.Add(ab.Dr["country_id"], ab.Dr["Kontinens"], ab.Dr["country"], ab.Dr["country_code"]);
            }
           
            lekerdezes = "select * from continents";
            ab = new Adatbazis(lekerdezes);
            while (ab.Dr.Read())
            {
                cbkontinens.Items.Add(ab.Dr["continent"]);
            }

        }
        public orszagok()
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
            Regex asd = new Regex(@"^[A-Z]{2}$");
            if (!asd.IsMatch(txorszagkod.Text))
            {
                MessageBox.Show("Csak két NAGY betűt adhat meg!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            else if (cbkontinens.SelectedItem is null)
            {
                MessageBox.Show("Kötelező az ország kontinensét kiválasztani!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                cbkontinens.Focus();
            }
            else if (txorszag.Text.Length == 0)
            {
                MessageBox.Show("Kötelező az ország nevét megadni!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txorszag.Focus();
            }
            else if (rbhozzaadas.Checked)
            {
                string lekerdezes = "select count(country) as db from countries where country='" + txorszag.Text + "'";
                Adatbazis ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                int vaneorszag = Convert.ToInt16(ab.Dr["db"]);
                ab.Lezaras();
                lekerdezes = "select count(country_code) as cdb from countries where country_code='" + txorszagkod.Text + "'";
                ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                int vaneorszagkod = Convert.ToInt16(ab.Dr["cdb"]);
                ab.Lezaras();
                if (vaneorszag > 0)
                {
                    MessageBox.Show("Ilyen ország már létezik!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    txorszag.Text = "";
                    txorszag.Focus();
                }
                else if (vaneorszagkod > 0)
                {
                    MessageBox.Show("Ilyen országkód már létezik!", "HIBA", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    txorszagkod.Text = "";
                    txorszagkod.Focus();
                }
                else
                {
                    lekerdezes = "insert into countries(continent,country,country_code) values(" + (cbkontinens.SelectedIndex + 1) + ",'" + txorszag.Text + "','" + txorszagkod.Text + "')";
                    ab = new Adatbazis(lekerdezes);
                    ab.Dr.Read();
                    MessageBox.Show("Sikeres Mentés!", "ÜZENET", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    txorszag.Text = "";
                    txorszagkod.Text = "";
                    cbkontinens.SelectedItem = null;
                    cbkontinens.Focus();
                }
            }
            else
            {
                string lekerdezes = "update countries set continent='" + (cbkontinens.SelectedIndex+1) + "', country='"+txorszag.Text+"', country_code='"+txorszagkod.Text+"' where country_id='" + countryid + "'";
                Adatbazis ab = new Adatbazis(lekerdezes);
                ab.Dr.Read();
                ab.Lezaras();
                MessageBox.Show("Sikeres módosítás!", "ÜZENET", MessageBoxButtons.OK, MessageBoxIcon.Information);
                cbkontinens.SelectedItem = null;
                txorszag.Text = "";
                txorszagkod.Text = "";
            }
            betoltes();
        }

        private void dgorszagok_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (rbmodositas.Checked)
            {
                DataGridViewRow sor = dgorszagok.Rows[e.RowIndex];
                countryid = Convert.ToInt32(sor.Cells["country_id"].Value);
                cbkontinens.SelectedItem = sor.Cells["continent"].Value;
                txorszag.Text = sor.Cells["country"].Value.ToString();
                txorszagkod.Text = sor.Cells["country_code"].Value.ToString();
                pladatok.Visible = true;
            }
        }
    }
}
