-- docker network create basoyen_network
-- docker run -d --name basoyen_mysql --network basoyen_network -e MYSQL_ROOT_PASSWORD=1122334 -e MYSQL_DATABASE=basoyen_db -e MYSQL_USER=basoyen_user -e MYSQL_PASSWORD=basoyen_pass -p 3306:3306 mysql:8

-- ============================================
-- DATABASE: BASO YEN REDESIGN
-- Dibuat untuk project MERN stack (MySQL)
-- ============================================

CREATE DATABASE IF NOT EXISTS basoyen_db;
USE basoyen_db;

CREATE TABLE product_categories (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,          
  slug      VARCHAR(100) NOT NULL UNIQUE,    
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Isi kategori awal
INSERT INTO product_categories (name, slug) VALUES
  ('Bakso',  'bakso'),
  ('Mie',    'mie'),
  ('Sosis',  'sosis'),
  ('Paket',  'paket');

CREATE TABLE products (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  slug          VARCHAR(150) NOT NULL UNIQUE,   -- untuk URL: /produk/baso-super
  category_id   INT,
  description   TEXT,
  price         DECIMAL(12, 2),                 -- harga, boleh NULL kalau harga by request
  image_url     VARCHAR(255),                   -- path file gambar yg diupload
  is_featured   BOOLEAN DEFAULT FALSE,          -- tampil di halaman Home?
  is_active     BOOLEAN DEFAULT TRUE,           -- tampilkan di website?
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL
);

CREATE TABLE recipes (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(200) NOT NULL,
  slug          VARCHAR(200) NOT NULL UNIQUE,
  ingredients   TEXT NOT NULL,   -- bahan-bahan (bisa disimpan sebagai teks biasa atau JSON)
  steps         TEXT NOT NULL,   -- langkah memasak
  image_url     VARCHAR(255),
  is_published  BOOLEAN DEFAULT FALSE,  -- draft dulu sebelum tayang
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL, 
  role          ENUM('admin', 'superadmin') DEFAULT 'admin',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE articles (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(250) NOT NULL,
  slug          VARCHAR(250) NOT NULL UNIQUE,
  content       LONGTEXT NOT NULL,       -- isi artikel panjang
  thumbnail_url VARCHAR(255),
  author_id     INT,
  is_published  BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- --------------------------------------------
-- TABEL 6: contacts
-- Pesan masuk dari form kontak / request sampel
-- --------------------------------------------
CREATE TABLE contacts (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  business_name VARCHAR(150),              -- nama cafe/resto/usaha (opsional)
  phone         VARCHAR(20),
  email         VARCHAR(150) NOT NULL,
  city          VARCHAR(100),
  message       TEXT NOT NULL,
  status        ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO articles (title, slug, content, thumbnail_url, author_id, is_published) VALUES
(
  'Tips Memilih Bakso Berkualitas',
  'tips-memilih-bakso-berkualitas',
  '<h2>Tips Memilih Bakso Berkualitas</h2><p>Bakso yang berkualitas memiliki tekstur kenyal dan rasa yang gurih. Berikut tips memilihnya:</p><ul><li>Pilih bakso yang berwarna cerah</li><li>Tekstur kenyal saat ditekan</li><li>Tidak berbau amis</li></ul>',
  NULL,
  NULL,
  true
),
(
  'Cara Memasak Mie Yang Benar',
  'cara-memasak-mie-yang-benar',
  '<h2>Cara Memasak Mie Yang Benar</h2><p>Memasak mie yang benar akan menghasilkan tekstur yang sempurna. Ikuti langkah berikut:</p><ul><li>Rebus air hingga mendidih</li><li>Masukkan mie selama 3 menit</li><li>Tiriskan dan sajikan</li></ul>',
  NULL,
  NULL,
  true
),
(
  'Manfaat Protein Dari Daging Sapi',
  'manfaat-protein-dari-daging-sapi',
  '<h2>Manfaat Protein Dari Daging Sapi</h2><p>Daging sapi mengandung protein tinggi yang baik untuk tubuh. Berikut manfaatnya:</p><ul><li>Membangun otot</li><li>Menjaga daya tahan tubuh</li><li>Sumber energi</li></ul>',
  NULL,
  NULL,
  true
);

INSERT INTO recipes (title, slug, ingredients, steps, image_url, is_published) VALUES
(
  'Baso Kuah Spesial',
  'baso-kuah-spesial',
  '["500g daging sapi giling", "2 siung bawang putih", "1 sdt garam", "1 sdt merica"]',
  '["Haluskan bawang putih", "Campur daging dengan bumbu", "Bentuk bulat-bulat", "Rebus hingga mengapung"]',
  NULL,
  true
),
(
  'Mie Ayam Baso',
  'mie-ayam-baso',
  '["250g mie keriting", "100g daging ayam", "2 sdm kecap asin", "1 sdt minyak wijen"]',
  '["Rebus mie hingga matang", "Tumis ayam dengan bumbu", "Campur mie dengan saus", "Sajikan dengan baso"]',
  NULL,
  true
),
(
  'Baso Goreng Crispy',
  'baso-goreng-crispy',
  '["10 butir baso", "100g tepung panir", "2 butir telur", "minyak goreng secukupnya"]',
  '["Celupkan baso ke telur", "Balur dengan tepung panir", "Goreng hingga keemasan", "Sajikan dengan saus sambal"]',
  NULL,
  true
);


INSERT INTO products (name, slug, category_id, description, price, is_featured, is_active) 
VALUES ('Baso Polos', 'baso-polos', 1, 'Bakso sapi pilihan tanpa isian', 25000, true, true);

INSERT INTO contacts (name, business_name, phone, email, city, message, status) VALUES
(
  'Budi Santoso',
  'Warung Makan Budi',
  '081234567890',
  'budi@gmail.com',
  'Bandung',
  'Halo, saya tertarik untuk menjadi reseller produk bakso anda. Bagaimana caranya?',
  'new'
),
(
  'Siti Rahayu',
  'Cafe Siti',
  '082345678901',
  'siti@gmail.com',
  'Jakarta',
  'Apakah produk anda tersedia untuk wilayah Jakarta? Saya ingin order dalam jumlah besar.',
  'read'
),
(
  'Ahmad Fauzi',
  NULL,
  '083456789012',
  'ahmad@gmail.com',
  'Surabaya',
  'Saya ingin request sampel produk mie keriting. Apakah bisa dikirim ke Surabaya?',
  'replied'
);