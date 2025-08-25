<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            'Electronics',
            'Fashion',
            'Home & Kitchen',
            'Sports & Outdoors',
            'Beauty & Personal Care',
            'Books & Stationery',
            'Toys & Games',
            'Automotive',
            'Health & Wellness',
            'Groceries & Food',
            'Office Supplies',
            'Jewelry & Watches',
        ];

        foreach ($departments as $dept) {
            Department::create([
                'name' => $dept,
                'slug' => Str::slug($dept),
                'meta_title' => $dept . ' Department',
                'meta_description' => 'Shop ' . $dept . ' products online',
                'active' => true,
            ]);
        }
    }
}
