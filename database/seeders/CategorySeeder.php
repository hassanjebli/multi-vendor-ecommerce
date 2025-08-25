<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Electronics' => [
                'Phones' => ['Smartphones', 'Feature Phones', 'Accessories'],
                'Computers' => ['Laptops', 'Desktops', 'Monitors', 'Components'],
                'TV & Audio' => ['Televisions', 'Speakers', 'Headphones'],
            ],
            'Fashion' => [
                'Men' => ['Shirts', 'Pants', 'Shoes', 'Accessories'],
                'Women' => ['Dresses', 'Handbags', 'Shoes', 'Jewelry'],
                'Kids' => ['Clothing', 'Shoes', 'Accessories'],
            ],
            'Home & Kitchen' => [
                'Furniture' => ['Sofas', 'Beds', 'Tables', 'Chairs'],
                'Appliances' => ['Refrigerators', 'Microwaves', 'Washing Machines'],
                'Decor' => ['Lighting', 'Wall Art', 'Curtains'],
            ],
            'Sports & Outdoors' => [
                'Fitness' => ['Gym Equipment', 'Yoga', 'Supplements'],
                'Outdoor' => ['Camping', 'Cycling', 'Hiking'],
            ],
            'Beauty & Personal Care' => [
                'Makeup' => ['Foundation', 'Lipstick', 'Eyeshadow'],
                'Hair Care' => ['Shampoo', 'Conditioner', 'Styling'],
                'Skin Care' => ['Moisturizers', 'Cleansers', 'Masks'],
            ],
            'Books & Stationery' => [
                'Books' => ['Fiction', 'Non-Fiction', 'Educational'],
                'Stationery' => ['Notebooks', 'Pens', 'Planners'],
            ],
            'Toys & Games' => [
                'Kids Toys' => ['Action Figures', 'Dolls', 'Educational Toys'],
                'Games' => ['Board Games', 'Video Games', 'Puzzles'],
            ],
            'Automotive' => [
                'Car Accessories' => ['Seat Covers', 'Car Electronics', 'Tires'],
                'Motorcycle' => ['Helmets', 'Riding Gear', 'Parts'],
            ],
            'Health & Wellness' => [
                'Supplements' => ['Vitamins', 'Proteins', 'Herbal'],
                'Medical' => ['First Aid', 'Devices', 'Personal Care'],
            ],
            'Groceries & Food' => [
                'Beverages' => ['Tea', 'Coffee', 'Juices'],
                'Snacks' => ['Chips', 'Biscuits', 'Nuts'],
                'Fresh Food' => ['Fruits', 'Vegetables', 'Meat'],
            ],
            'Office Supplies' => [
                'Furniture' => ['Desks', 'Chairs', 'Cabinets'],
                'Essentials' => ['Paper', 'Ink & Toner', 'Files'],
            ],
            'Jewelry & Watches' => [
                'Jewelry' => ['Rings', 'Necklaces', 'Bracelets'],
                'Watches' => ['Men Watches', 'Women Watches', 'Smartwatches'],
            ],
        ];

        foreach ($categories as $deptName => $cats) {
            $department = Department::where('name', $deptName)->first();

            foreach ($cats as $cat => $subcats) {
                // Parent category
                $parent = Category::create([
                    'name' => $cat,
                    'department_id' => $department->id,
                    'active' => true,
                ]);

                // Children categories
                foreach ($subcats as $sub) {
                    Category::create([
                        'name' => $sub,
                        'department_id' => $department->id,
                        'parent_id' => $parent->id,
                        'active' => true,
                    ]);
                }
            }
        }
    }
}
