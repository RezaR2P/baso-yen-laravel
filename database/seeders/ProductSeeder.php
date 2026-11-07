<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['id' => 17, 'name' => 'Bakso Keju', 'slug' => 'bakso-keju', 'category_id' => 1, 'description' => 'Bakso Keju Lumer', 'price' => 25000, 'image_url' => '/uploads/1781341747273-224583905.png', 'is_featured' => true],
            ['id' => 18, 'name' => 'Bakso Mercon', 'slug' => 'bakso-mercon', 'category_id' => 1, 'description' => 'Bakso Mercon Pedas gila Gokil Banget pokonyamah', 'price' => 20000, 'image_url' => '/uploads/1781338347180-714920979.png', 'is_featured' => true],
            ['id' => 19, 'name' => 'Bakso tongcay', 'slug' => 'bakso-tongcay', 'category_id' => 1, 'description' => 'Mantep dah', 'price' => 15000, 'image_url' => '/uploads/1781338381361-714959112.png', 'is_featured' => false],
            ['id' => 20, 'name' => 'Bakso Mini', 'slug' => 'bakso-mini', 'category_id' => 1, 'description' => 'Bakso kecil kecil', 'price' => 10000, 'image_url' => '/uploads/1781338509864-499383888.png', 'is_featured' => false],
            ['id' => 21, 'name' => 'Bakso Standar', 'slug' => 'bakso-standar', 'category_id' => 1, 'description' => 'Bakso Standar dengan daging sapi 100%', 'price' => 12000, 'image_url' => '/uploads/1781338553938-100853236.png', 'is_featured' => false],
            ['id' => 22, 'name' => 'Bakso Urat', 'slug' => 'bakso-urat', 'category_id' => 1, 'description' => 'Bakso Urat Sapi', 'price' => 25000, 'image_url' => '/uploads/1781338595566-42576602.png', 'is_featured' => false],
            ['id' => 23, 'name' => 'Mie Hitam', 'slug' => 'mie-hitam', 'category_id' => 2, 'description' => 'Mie Hitam dengan tinta cumi', 'price' => 8000, 'image_url' => '/uploads/1781338708192-23006569.png', 'is_featured' => true],
            ['id' => 24, 'name' => 'Mie Goreng', 'slug' => 'mie-goreng', 'category_id' => 2, 'description' => 'Mie Goreng', 'price' => 5000, 'image_url' => '/uploads/1781338743606-602680872.png', 'is_featured' => false],
            ['id' => 25, 'name' => 'Mie Grobak', 'slug' => 'mie-grobak', 'category_id' => 2, 'description' => 'Mie Grobakabang abang bakso', 'price' => 7000, 'image_url' => '/uploads/1781338800792-81471627.png', 'is_featured' => false],
            ['id' => 26, 'name' => 'Mie Premium', 'slug' => 'mie-premium', 'category_id' => 2, 'description' => 'Mie dengan bahan bahan premium', 'price' => 15000, 'image_url' => '/uploads/1781338882195-497631214.png', 'is_featured' => true],
            ['id' => 27, 'name' => 'Sosis Ayam', 'slug' => 'sosis-ayam', 'category_id' => 3, 'description' => 'Sosis Ayam isi 5', 'price' => 10000, 'image_url' => '/uploads/1781338960061-254135458.png', 'is_featured' => false],
            ['id' => 28, 'name' => 'Sosis Sapi', 'slug' => 'sosis-sapi', 'category_id' => 3, 'description' => 'isi 5', 'price' => 20000, 'image_url' => '/uploads/1781338991859-749207795.png', 'is_featured' => true],
            ['id' => 29, 'name' => 'Kulit Pangsit DImsum', 'slug' => 'kulit-pangsit-dimsum', 'category_id' => 13, 'description' => 'Kulit Pangsit isi 30 lembar', 'price' => 15000, 'image_url' => '/uploads/1781339132994-535118397.png', 'is_featured' => true],
            ['id' => 30, 'name' => 'Kulit Gyoza', 'slug' => 'kulit-gyoza', 'category_id' => 13, 'description' => 'Kulit Gyoza isi 30 lembar', 'price' => 30000, 'image_url' => '/uploads/1781339175360-527615152.png', 'is_featured' => true],
            ['id' => 31, 'name' => 'Kulit Pangsit Bawang Daun', 'slug' => 'kulit-pangsit-bawang-daun', 'category_id' => 13, 'description' => 'Kulit Pangsit isi 20 lembar', 'price' => 20000, 'image_url' => '/uploads/1781339235560-743122899.png', 'is_featured' => false],
        ];

        Model::unguarded(function () use ($products) {
            foreach ($products as $product) {
                Product::updateOrCreate(
                    ['id' => $product['id']],
                    $product + ['is_active' => true],
                );
            }
        });
    }
}
