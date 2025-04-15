using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace vizsgaremek
{
    internal class Adatbazis
    {

        private string hostname = "localhost";
        private string username = "root";
        private string password = "";
        private string database = "elmecsata";

        private string szerver => $"server={hostname};uid={username};password={password};database={database}";

        MySqlConnection kapcsolat;
        MySqlCommand parancs;
        MySqlDataReader dr;

        public MySqlDataReader Dr { get => dr; set => dr = value; }

        public Adatbazis(string sql)
        {
            kapcsolat = new MySqlConnection(szerver);
            kapcsolat.Open();
            parancs = new MySqlCommand(sql, kapcsolat);
            dr = parancs.ExecuteReader();
        }

        public void Lezaras()
        {
            kapcsolat.Close();
        }

        ~Adatbazis()
        {
            kapcsolat.Close();
        }
    }
}
