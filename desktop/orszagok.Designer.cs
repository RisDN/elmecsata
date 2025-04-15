namespace vizsgaremek
{
    partial class orszagok
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(orszagok));
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle4 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle5 = new System.Windows.Forms.DataGridViewCellStyle();
            this.thunderForm1 = new ReaLTaiizor.Forms.ThunderForm();
            this.pladatok = new System.Windows.Forms.Panel();
            this.cbkontinens = new ReaLTaiizor.Controls.ForeverComboBox();
            this.btelvet = new ReaLTaiizor.Controls.Button();
            this.btmentes = new ReaLTaiizor.Controls.Button();
            this.txorszagkod = new ReaLTaiizor.Controls.ForeverTextBox();
            this.thunderLabel3 = new ReaLTaiizor.Controls.ThunderLabel();
            this.txorszag = new ReaLTaiizor.Controls.ForeverTextBox();
            this.thunderLabel2 = new ReaLTaiizor.Controls.ThunderLabel();
            this.thunderLabel1 = new ReaLTaiizor.Controls.ThunderLabel();
            this.thunderGroupBox1 = new ReaLTaiizor.Controls.ThunderGroupBox();
            this.rbmodositas = new System.Windows.Forms.RadioButton();
            this.rbhozzaadas = new System.Windows.Forms.RadioButton();
            this.dgorszagok = new System.Windows.Forms.DataGridView();
            this.country_id = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.continent = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.country = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.country_code = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.thunderControlBox1 = new ReaLTaiizor.Controls.ThunderControlBox();
            this.thunderForm1.SuspendLayout();
            this.pladatok.SuspendLayout();
            this.thunderGroupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgorszagok)).BeginInit();
            this.SuspendLayout();
            // 
            // thunderForm1
            // 
            this.thunderForm1.BodyColorA = System.Drawing.Color.FromArgb(((int)(((byte)(25)))), ((int)(((byte)(25)))), ((int)(((byte)(25)))));
            this.thunderForm1.BodyColorB = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(35)))), ((int)(((byte)(48)))));
            this.thunderForm1.BodyColorC = System.Drawing.Color.FromArgb(((int)(((byte)(46)))), ((int)(((byte)(46)))), ((int)(((byte)(46)))));
            this.thunderForm1.BodyColorD = System.Drawing.Color.FromArgb(((int)(((byte)(50)))), ((int)(((byte)(55)))), ((int)(((byte)(58)))));
            this.thunderForm1.Controls.Add(this.pladatok);
            this.thunderForm1.Controls.Add(this.thunderGroupBox1);
            this.thunderForm1.Controls.Add(this.dgorszagok);
            this.thunderForm1.Controls.Add(this.thunderControlBox1);
            this.thunderForm1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.thunderForm1.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderForm1.Image = ((System.Drawing.Image)(resources.GetObject("thunderForm1.Image")));
            this.thunderForm1.Location = new System.Drawing.Point(0, 0);
            this.thunderForm1.Margin = new System.Windows.Forms.Padding(2);
            this.thunderForm1.MinimumSize = new System.Drawing.Size(202, 41);
            this.thunderForm1.Name = "thunderForm1";
            this.thunderForm1.Padding = new System.Windows.Forms.Padding(8, 24, 8, 5);
            this.thunderForm1.Size = new System.Drawing.Size(872, 618);
            this.thunderForm1.TabIndex = 0;
            this.thunderForm1.Text = "Országok Tábla";
            // 
            // pladatok
            // 
            this.pladatok.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(63)))), ((int)(((byte)(65)))));
            this.pladatok.Controls.Add(this.cbkontinens);
            this.pladatok.Controls.Add(this.btelvet);
            this.pladatok.Controls.Add(this.btmentes);
            this.pladatok.Controls.Add(this.txorszagkod);
            this.pladatok.Controls.Add(this.thunderLabel3);
            this.pladatok.Controls.Add(this.txorszag);
            this.pladatok.Controls.Add(this.thunderLabel2);
            this.pladatok.Controls.Add(this.thunderLabel1);
            this.pladatok.Location = new System.Drawing.Point(559, 219);
            this.pladatok.Margin = new System.Windows.Forms.Padding(2);
            this.pladatok.Name = "pladatok";
            this.pladatok.Size = new System.Drawing.Size(292, 351);
            this.pladatok.TabIndex = 26;
            // 
            // cbkontinens
            // 
            this.cbkontinens.BaseColor = System.Drawing.Color.Indigo;
            this.cbkontinens.BGColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.cbkontinens.Cursor = System.Windows.Forms.Cursors.Hand;
            this.cbkontinens.DrawMode = System.Windows.Forms.DrawMode.OwnerDrawFixed;
            this.cbkontinens.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cbkontinens.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.cbkontinens.ForeColor = System.Drawing.Color.White;
            this.cbkontinens.FormattingEnabled = true;
            this.cbkontinens.HoverColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.cbkontinens.HoverFontColor = System.Drawing.Color.White;
            this.cbkontinens.ItemHeight = 18;
            this.cbkontinens.Location = new System.Drawing.Point(94, 34);
            this.cbkontinens.Margin = new System.Windows.Forms.Padding(2);
            this.cbkontinens.Name = "cbkontinens";
            this.cbkontinens.Size = new System.Drawing.Size(142, 24);
            this.cbkontinens.TabIndex = 25;
            // 
            // btelvet
            // 
            this.btelvet.BackColor = System.Drawing.Color.Transparent;
            this.btelvet.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(34)))), ((int)(((byte)(37)))));
            this.btelvet.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btelvet.EnteredBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.btelvet.EnteredColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(34)))), ((int)(((byte)(37)))));
            this.btelvet.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.btelvet.Image = null;
            this.btelvet.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btelvet.InactiveColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(34)))), ((int)(((byte)(37)))));
            this.btelvet.Location = new System.Drawing.Point(146, 284);
            this.btelvet.Name = "btelvet";
            this.btelvet.PressedBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.btelvet.PressedColor = System.Drawing.Color.Indigo;
            this.btelvet.Size = new System.Drawing.Size(137, 36);
            this.btelvet.TabIndex = 24;
            this.btelvet.Text = "Elvet";
            this.btelvet.TextAlignment = System.Drawing.StringAlignment.Center;
            this.btelvet.Click += new System.EventHandler(this.btelvet_Click);
            // 
            // btmentes
            // 
            this.btmentes.BackColor = System.Drawing.Color.Transparent;
            this.btmentes.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(34)))), ((int)(((byte)(37)))));
            this.btmentes.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btmentes.EnteredBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.btmentes.EnteredColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(34)))), ((int)(((byte)(37)))));
            this.btmentes.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.btmentes.Image = null;
            this.btmentes.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btmentes.InactiveColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(34)))), ((int)(((byte)(37)))));
            this.btmentes.Location = new System.Drawing.Point(7, 284);
            this.btmentes.Name = "btmentes";
            this.btmentes.PressedBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.btmentes.PressedColor = System.Drawing.Color.Indigo;
            this.btmentes.Size = new System.Drawing.Size(133, 36);
            this.btmentes.TabIndex = 23;
            this.btmentes.Text = "Mentés";
            this.btmentes.TextAlignment = System.Drawing.StringAlignment.Center;
            this.btmentes.Click += new System.EventHandler(this.btmentes_Click);
            // 
            // txorszagkod
            // 
            this.txorszagkod.BackColor = System.Drawing.Color.Transparent;
            this.txorszagkod.BaseColor = System.Drawing.Color.Indigo;
            this.txorszagkod.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.txorszagkod.FocusOnHover = false;
            this.txorszagkod.Font = new System.Drawing.Font("Arial Rounded MT Bold", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txorszagkod.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.txorszagkod.Location = new System.Drawing.Point(102, 134);
            this.txorszagkod.MaxLength = 2;
            this.txorszagkod.Multiline = false;
            this.txorszagkod.Name = "txorszagkod";
            this.txorszagkod.ReadOnly = false;
            this.txorszagkod.Size = new System.Drawing.Size(63, 27);
            this.txorszagkod.TabIndex = 22;
            this.txorszagkod.TextAlign = System.Windows.Forms.HorizontalAlignment.Left;
            this.txorszagkod.UseSystemPasswordChar = false;
            // 
            // thunderLabel3
            // 
            this.thunderLabel3.BackColor = System.Drawing.Color.Transparent;
            this.thunderLabel3.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.thunderLabel3.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderLabel3.Location = new System.Drawing.Point(10, 136);
            this.thunderLabel3.Name = "thunderLabel3";
            this.thunderLabel3.Size = new System.Drawing.Size(103, 24);
            this.thunderLabel3.TabIndex = 21;
            this.thunderLabel3.Text = "Ország kódja:";
            // 
            // txorszag
            // 
            this.txorszag.BackColor = System.Drawing.Color.Transparent;
            this.txorszag.BaseColor = System.Drawing.Color.Indigo;
            this.txorszag.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.txorszag.FocusOnHover = false;
            this.txorszag.Font = new System.Drawing.Font("Arial Rounded MT Bold", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txorszag.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.txorszag.Location = new System.Drawing.Point(85, 82);
            this.txorszag.MaxLength = 20;
            this.txorszag.Multiline = false;
            this.txorszag.Name = "txorszag";
            this.txorszag.ReadOnly = false;
            this.txorszag.Size = new System.Drawing.Size(198, 27);
            this.txorszag.TabIndex = 20;
            this.txorszag.TextAlign = System.Windows.Forms.HorizontalAlignment.Left;
            this.txorszag.UseSystemPasswordChar = false;
            // 
            // thunderLabel2
            // 
            this.thunderLabel2.BackColor = System.Drawing.Color.Transparent;
            this.thunderLabel2.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.thunderLabel2.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderLabel2.Location = new System.Drawing.Point(10, 84);
            this.thunderLabel2.Name = "thunderLabel2";
            this.thunderLabel2.Size = new System.Drawing.Size(103, 24);
            this.thunderLabel2.TabIndex = 19;
            this.thunderLabel2.Text = "Ország:";
            // 
            // thunderLabel1
            // 
            this.thunderLabel1.BackColor = System.Drawing.Color.Transparent;
            this.thunderLabel1.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.thunderLabel1.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderLabel1.Location = new System.Drawing.Point(10, 34);
            this.thunderLabel1.Name = "thunderLabel1";
            this.thunderLabel1.Size = new System.Drawing.Size(103, 24);
            this.thunderLabel1.TabIndex = 17;
            this.thunderLabel1.Text = "Kontinens:";
            // 
            // thunderGroupBox1
            // 
            this.thunderGroupBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(47)))), ((int)(((byte)(49)))), ((int)(((byte)(50)))));
            this.thunderGroupBox1.BodyColorA = System.Drawing.Color.FromArgb(((int)(((byte)(26)))), ((int)(((byte)(26)))), ((int)(((byte)(26)))));
            this.thunderGroupBox1.BodyColorB = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(30)))), ((int)(((byte)(30)))));
            this.thunderGroupBox1.BodyColorC = System.Drawing.Color.FromArgb(((int)(((byte)(46)))), ((int)(((byte)(46)))), ((int)(((byte)(46)))));
            this.thunderGroupBox1.BodyColorD = System.Drawing.Color.FromArgb(((int)(((byte)(50)))), ((int)(((byte)(55)))), ((int)(((byte)(58)))));
            this.thunderGroupBox1.Controls.Add(this.rbmodositas);
            this.thunderGroupBox1.Controls.Add(this.rbhozzaadas);
            this.thunderGroupBox1.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderGroupBox1.Location = new System.Drawing.Point(559, 83);
            this.thunderGroupBox1.Margin = new System.Windows.Forms.Padding(2);
            this.thunderGroupBox1.Name = "thunderGroupBox1";
            this.thunderGroupBox1.Size = new System.Drawing.Size(292, 120);
            this.thunderGroupBox1.TabIndex = 3;
            this.thunderGroupBox1.Text = "Lehetőségek";
            // 
            // rbmodositas
            // 
            this.rbmodositas.AutoSize = true;
            this.rbmodositas.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.rbmodositas.Location = new System.Drawing.Point(10, 73);
            this.rbmodositas.Margin = new System.Windows.Forms.Padding(2);
            this.rbmodositas.Name = "rbmodositas";
            this.rbmodositas.Size = new System.Drawing.Size(97, 20);
            this.rbmodositas.TabIndex = 11;
            this.rbmodositas.TabStop = true;
            this.rbmodositas.Text = "Módosítás";
            this.rbmodositas.UseVisualStyleBackColor = true;
            this.rbmodositas.CheckedChanged += new System.EventHandler(this.rbmodositas_CheckedChanged);
            // 
            // rbhozzaadas
            // 
            this.rbhozzaadas.AutoSize = true;
            this.rbhozzaadas.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.rbhozzaadas.Location = new System.Drawing.Point(10, 34);
            this.rbhozzaadas.Margin = new System.Windows.Forms.Padding(2);
            this.rbhozzaadas.Name = "rbhozzaadas";
            this.rbhozzaadas.Size = new System.Drawing.Size(103, 20);
            this.rbhozzaadas.TabIndex = 10;
            this.rbhozzaadas.TabStop = true;
            this.rbhozzaadas.Text = "Hozzáadás";
            this.rbhozzaadas.UseVisualStyleBackColor = true;
            this.rbhozzaadas.CheckedChanged += new System.EventHandler(this.rbhozzaadas_CheckedChanged);
            // 
            // dgorszagok
            // 
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            this.dgorszagok.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
            this.dgorszagok.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(47)))), ((int)(((byte)(48)))), ((int)(((byte)(48)))));
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dgorszagok.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
            this.dgorszagok.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgorszagok.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.country_id,
            this.continent,
            this.country,
            this.country_code});
            dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle3.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle3.ForeColor = System.Drawing.Color.WhiteSmoke;
            dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle3.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dgorszagok.DefaultCellStyle = dataGridViewCellStyle3;
            this.dgorszagok.GridColor = System.Drawing.SystemColors.AppWorkspace;
            this.dgorszagok.Location = new System.Drawing.Point(23, 39);
            this.dgorszagok.Name = "dgorszagok";
            this.dgorszagok.ReadOnly = true;
            dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle4.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle4.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dgorszagok.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
            this.dgorszagok.RowHeadersWidth = 51;
            dataGridViewCellStyle5.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle5.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle5.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(110)))), ((int)(((byte)(113)))), ((int)(((byte)(145)))));
            dataGridViewCellStyle5.SelectionForeColor = System.Drawing.Color.White;
            this.dgorszagok.RowsDefaultCellStyle = dataGridViewCellStyle5;
            this.dgorszagok.Size = new System.Drawing.Size(520, 550);
            this.dgorszagok.TabIndex = 2;
            this.dgorszagok.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dgorszagok_CellClick);
            // 
            // country_id
            // 
            this.country_id.HeaderText = "Országok_id";
            this.country_id.MinimumWidth = 6;
            this.country_id.Name = "country_id";
            this.country_id.ReadOnly = true;
            this.country_id.Width = 125;
            // 
            // continent
            // 
            this.continent.HeaderText = "Kontinens";
            this.continent.MinimumWidth = 6;
            this.continent.Name = "continent";
            this.continent.ReadOnly = true;
            this.continent.Width = 120;
            // 
            // country
            // 
            this.country.HeaderText = "Ország";
            this.country.MinimumWidth = 6;
            this.country.Name = "country";
            this.country.ReadOnly = true;
            this.country.Width = 120;
            // 
            // country_code
            // 
            this.country_code.HeaderText = "Ország kódja";
            this.country_code.MinimumWidth = 6;
            this.country_code.Name = "country_code";
            this.country_code.ReadOnly = true;
            // 
            // thunderControlBox1
            // 
            this.thunderControlBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.thunderControlBox1.BackColor = System.Drawing.Color.Transparent;
            this.thunderControlBox1.DefaultLocation = true;
            this.thunderControlBox1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.thunderControlBox1.Location = new System.Drawing.Point(788, 3);
            this.thunderControlBox1.Margin = new System.Windows.Forms.Padding(2);
            this.thunderControlBox1.Name = "thunderControlBox1";
            this.thunderControlBox1.Size = new System.Drawing.Size(81, 32);
            this.thunderControlBox1.TabIndex = 0;
            this.thunderControlBox1.Text = "thunderControlBox1";
            // 
            // orszagok
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(872, 618);
            this.Controls.Add(this.thunderForm1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "orszagok";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "Országok Tábla";
            this.TransparencyKey = System.Drawing.Color.Fuchsia;
            this.thunderForm1.ResumeLayout(false);
            this.pladatok.ResumeLayout(false);
            this.thunderGroupBox1.ResumeLayout(false);
            this.thunderGroupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgorszagok)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private ReaLTaiizor.Forms.ThunderForm thunderForm1;
        private ReaLTaiizor.Controls.ThunderControlBox thunderControlBox1;
        private System.Windows.Forms.DataGridView dgorszagok;
        private ReaLTaiizor.Controls.ThunderGroupBox thunderGroupBox1;
        private ReaLTaiizor.Controls.ForeverTextBox txorszagkod;
        private ReaLTaiizor.Controls.ThunderLabel thunderLabel3;
        private ReaLTaiizor.Controls.ForeverTextBox txorszag;
        private ReaLTaiizor.Controls.ThunderLabel thunderLabel2;
        private ReaLTaiizor.Controls.ThunderLabel thunderLabel1;
        private ReaLTaiizor.Controls.Button btelvet;
        private ReaLTaiizor.Controls.Button btmentes;
        private ReaLTaiizor.Controls.ForeverComboBox cbkontinens;
        private System.Windows.Forms.Panel pladatok;
        private System.Windows.Forms.RadioButton rbmodositas;
        private System.Windows.Forms.RadioButton rbhozzaadas;
        private System.Windows.Forms.DataGridViewTextBoxColumn country_id;
        private System.Windows.Forms.DataGridViewTextBoxColumn continent;
        private System.Windows.Forms.DataGridViewTextBoxColumn country;
        private System.Windows.Forms.DataGridViewTextBoxColumn country_code;
    }
}