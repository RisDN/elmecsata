namespace vizsgaremek
{
    partial class kontinens
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(kontinens));
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle4 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle5 = new System.Windows.Forms.DataGridViewCellStyle();
            this.thunderForm1 = new ReaLTaiizor.Forms.ThunderForm();
            this.pladatok = new System.Windows.Forms.Panel();
            this.txkontinens = new ReaLTaiizor.Controls.ForeverTextBox();
            this.btelvet = new ReaLTaiizor.Controls.Button();
            this.btmentes = new ReaLTaiizor.Controls.Button();
            this.thunderLabel1 = new ReaLTaiizor.Controls.ThunderLabel();
            this.thunderGroupBox1 = new ReaLTaiizor.Controls.ThunderGroupBox();
            this.rbmodositas = new System.Windows.Forms.RadioButton();
            this.rbhozzaadas = new System.Windows.Forms.RadioButton();
            this.dgkontinens = new System.Windows.Forms.DataGridView();
            this.continent_id = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.continent = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.thunderControlBox1 = new ReaLTaiizor.Controls.ThunderControlBox();
            this.thunderForm1.SuspendLayout();
            this.pladatok.SuspendLayout();
            this.thunderGroupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgkontinens)).BeginInit();
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
            this.thunderForm1.Controls.Add(this.dgkontinens);
            this.thunderForm1.Controls.Add(this.thunderControlBox1);
            this.thunderForm1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.thunderForm1.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderForm1.Image = ((System.Drawing.Image)(resources.GetObject("thunderForm1.Image")));
            this.thunderForm1.Location = new System.Drawing.Point(0, 0);
            this.thunderForm1.Margin = new System.Windows.Forms.Padding(2);
            this.thunderForm1.MinimumSize = new System.Drawing.Size(236, 41);
            this.thunderForm1.Name = "thunderForm1";
            this.thunderForm1.Padding = new System.Windows.Forms.Padding(9, 24, 9, 5);
            this.thunderForm1.Size = new System.Drawing.Size(611, 324);
            this.thunderForm1.TabIndex = 0;
            this.thunderForm1.Text = "Kontinens Tábla";
            // 
            // pladatok
            // 
            this.pladatok.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(63)))), ((int)(((byte)(65)))));
            this.pladatok.Controls.Add(this.txkontinens);
            this.pladatok.Controls.Add(this.btelvet);
            this.pladatok.Controls.Add(this.btmentes);
            this.pladatok.Controls.Add(this.thunderLabel1);
            this.pladatok.ForeColor = System.Drawing.Color.DimGray;
            this.pladatok.Location = new System.Drawing.Point(330, 156);
            this.pladatok.Name = "pladatok";
            this.pladatok.Size = new System.Drawing.Size(254, 154);
            this.pladatok.TabIndex = 9;
            // 
            // txkontinens
            // 
            this.txkontinens.BackColor = System.Drawing.Color.Transparent;
            this.txkontinens.BaseColor = System.Drawing.Color.Indigo;
            this.txkontinens.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.txkontinens.FocusOnHover = false;
            this.txkontinens.Font = new System.Drawing.Font("Arial Rounded MT Bold", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txkontinens.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.txkontinens.Location = new System.Drawing.Point(83, 23);
            this.txkontinens.MaxLength = 20;
            this.txkontinens.Multiline = false;
            this.txkontinens.Name = "txkontinens";
            this.txkontinens.ReadOnly = false;
            this.txkontinens.Size = new System.Drawing.Size(158, 27);
            this.txkontinens.TabIndex = 6;
            this.txkontinens.TextAlign = System.Windows.Forms.HorizontalAlignment.Left;
            this.txkontinens.UseSystemPasswordChar = false;
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
            this.btelvet.Location = new System.Drawing.Point(129, 94);
            this.btelvet.Name = "btelvet";
            this.btelvet.PressedBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.btelvet.PressedColor = System.Drawing.Color.Indigo;
            this.btelvet.Size = new System.Drawing.Size(112, 36);
            this.btelvet.TabIndex = 8;
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
            this.btmentes.Location = new System.Drawing.Point(5, 94);
            this.btmentes.Name = "btmentes";
            this.btmentes.PressedBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.btmentes.PressedColor = System.Drawing.Color.Indigo;
            this.btmentes.Size = new System.Drawing.Size(108, 36);
            this.btmentes.TabIndex = 7;
            this.btmentes.Text = "Mentés";
            this.btmentes.TextAlignment = System.Drawing.StringAlignment.Center;
            this.btmentes.Click += new System.EventHandler(this.btmentes_Click);
            // 
            // thunderLabel1
            // 
            this.thunderLabel1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(63)))), ((int)(((byte)(65)))));
            this.thunderLabel1.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.thunderLabel1.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderLabel1.Location = new System.Drawing.Point(5, 26);
            this.thunderLabel1.Name = "thunderLabel1";
            this.thunderLabel1.Size = new System.Drawing.Size(78, 24);
            this.thunderLabel1.TabIndex = 3;
            this.thunderLabel1.Text = "Kontinens:";
            // 
            // thunderGroupBox1
            // 
            this.thunderGroupBox1.BackColor = System.Drawing.Color.Transparent;
            this.thunderGroupBox1.BodyColorA = System.Drawing.Color.FromArgb(((int)(((byte)(26)))), ((int)(((byte)(26)))), ((int)(((byte)(26)))));
            this.thunderGroupBox1.BodyColorB = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(30)))), ((int)(((byte)(30)))));
            this.thunderGroupBox1.BodyColorC = System.Drawing.Color.FromArgb(((int)(((byte)(46)))), ((int)(((byte)(46)))), ((int)(((byte)(46)))));
            this.thunderGroupBox1.BodyColorD = System.Drawing.Color.FromArgb(((int)(((byte)(50)))), ((int)(((byte)(55)))), ((int)(((byte)(58)))));
            this.thunderGroupBox1.Controls.Add(this.rbmodositas);
            this.thunderGroupBox1.Controls.Add(this.rbhozzaadas);
            this.thunderGroupBox1.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.thunderGroupBox1.Location = new System.Drawing.Point(330, 37);
            this.thunderGroupBox1.Name = "thunderGroupBox1";
            this.thunderGroupBox1.Size = new System.Drawing.Size(254, 113);
            this.thunderGroupBox1.TabIndex = 2;
            this.thunderGroupBox1.Text = "Lehetőségek";
            // 
            // rbmodositas
            // 
            this.rbmodositas.AutoSize = true;
            this.rbmodositas.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.rbmodositas.Location = new System.Drawing.Point(11, 73);
            this.rbmodositas.Name = "rbmodositas";
            this.rbmodositas.Size = new System.Drawing.Size(97, 20);
            this.rbmodositas.TabIndex = 7;
            this.rbmodositas.TabStop = true;
            this.rbmodositas.Text = "Módosítás";
            this.rbmodositas.UseVisualStyleBackColor = true;
            this.rbmodositas.CheckedChanged += new System.EventHandler(this.rbmodositas_CheckedChanged);
            // 
            // rbhozzaadas
            // 
            this.rbhozzaadas.AutoSize = true;
            this.rbhozzaadas.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.rbhozzaadas.Location = new System.Drawing.Point(11, 39);
            this.rbhozzaadas.Name = "rbhozzaadas";
            this.rbhozzaadas.Size = new System.Drawing.Size(103, 20);
            this.rbhozzaadas.TabIndex = 6;
            this.rbhozzaadas.TabStop = true;
            this.rbhozzaadas.Text = "Hozzáadás";
            this.rbhozzaadas.UseVisualStyleBackColor = true;
            this.rbhozzaadas.CheckedChanged += new System.EventHandler(this.rbhozzaadas_CheckedChanged);
            // 
            // dgkontinens
            // 
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            this.dgkontinens.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
            this.dgkontinens.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(47)))), ((int)(((byte)(48)))), ((int)(((byte)(48)))));
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dgkontinens.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
            this.dgkontinens.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgkontinens.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.continent_id,
            this.continent});
            dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle3.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle3.ForeColor = System.Drawing.Color.WhiteSmoke;
            dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle3.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dgkontinens.DefaultCellStyle = dataGridViewCellStyle3;
            this.dgkontinens.GridColor = System.Drawing.SystemColors.AppWorkspace;
            this.dgkontinens.Location = new System.Drawing.Point(23, 37);
            this.dgkontinens.Name = "dgkontinens";
            this.dgkontinens.ReadOnly = true;
            dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle4.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(54)))), ((int)(((byte)(36)))), ((int)(((byte)(120)))));
            dataGridViewCellStyle4.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(217)))), ((int)(((byte)(217)))));
            dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dgkontinens.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
            this.dgkontinens.RowHeadersWidth = 51;
            dataGridViewCellStyle5.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(186)))), ((int)(((byte)(191)))), ((int)(((byte)(246)))));
            dataGridViewCellStyle5.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(36)))), ((int)(((byte)(36)))), ((int)(((byte)(36)))));
            dataGridViewCellStyle5.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(110)))), ((int)(((byte)(113)))), ((int)(((byte)(145)))));
            dataGridViewCellStyle5.SelectionForeColor = System.Drawing.Color.White;
            this.dgkontinens.RowsDefaultCellStyle = dataGridViewCellStyle5;
            this.dgkontinens.Size = new System.Drawing.Size(301, 276);
            this.dgkontinens.TabIndex = 1;
            this.dgkontinens.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dgkontinens_CellClick);
            // 
            // continent_id
            // 
            this.continent_id.HeaderText = "Kontinens id";
            this.continent_id.MinimumWidth = 6;
            this.continent_id.Name = "continent_id";
            this.continent_id.ReadOnly = true;
            this.continent_id.Width = 125;
            // 
            // continent
            // 
            this.continent.HeaderText = "Kontinensek";
            this.continent.MinimumWidth = 6;
            this.continent.Name = "continent";
            this.continent.ReadOnly = true;
            this.continent.Width = 120;
            // 
            // thunderControlBox1
            // 
            this.thunderControlBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.thunderControlBox1.BackColor = System.Drawing.Color.Transparent;
            this.thunderControlBox1.DefaultLocation = true;
            this.thunderControlBox1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(58)))), ((int)(((byte)(237)))));
            this.thunderControlBox1.Location = new System.Drawing.Point(529, 3);
            this.thunderControlBox1.Margin = new System.Windows.Forms.Padding(2);
            this.thunderControlBox1.Name = "thunderControlBox1";
            this.thunderControlBox1.Size = new System.Drawing.Size(79, 28);
            this.thunderControlBox1.TabIndex = 0;
            this.thunderControlBox1.Text = "thunderControlBox1";
            // 
            // kontinens
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(611, 324);
            this.Controls.Add(this.thunderForm1);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "kontinens";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "Kontinens Tábla";
            this.TransparencyKey = System.Drawing.Color.Fuchsia;
            this.thunderForm1.ResumeLayout(false);
            this.pladatok.ResumeLayout(false);
            this.thunderGroupBox1.ResumeLayout(false);
            this.thunderGroupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgkontinens)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private ReaLTaiizor.Forms.ThunderForm thunderForm1;
        private ReaLTaiizor.Controls.ThunderControlBox thunderControlBox1;
        private System.Windows.Forms.DataGridView dgkontinens;
        private System.Windows.Forms.DataGridViewTextBoxColumn continent_id;
        private System.Windows.Forms.DataGridViewTextBoxColumn continent;
        private ReaLTaiizor.Controls.ThunderGroupBox thunderGroupBox1;
        private ReaLTaiizor.Controls.ThunderLabel thunderLabel1;
        private ReaLTaiizor.Controls.ForeverTextBox txkontinens;
        private ReaLTaiizor.Controls.Button btmentes;
        private ReaLTaiizor.Controls.Button btelvet;
        private System.Windows.Forms.RadioButton rbmodositas;
        private System.Windows.Forms.RadioButton rbhozzaadas;
        private System.Windows.Forms.Panel pladatok;
    }
}