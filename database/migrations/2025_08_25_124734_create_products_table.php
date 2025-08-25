<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->string('slug')->unique();
      $table->longText('description')->nullable();
      $table->foreignId('department_id')->index()->constrained('departments')->onDelete('cascade');
      $table->foreignId('category_id')->index()->constrained('categories')->onDelete('cascade');
      $table->decimal('price', 20, 4);
      $table->string('status')->index();
      $table->integer('quantity')->default(0);
      $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
      $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('cascade');
      $table->timestamp('deleted_at')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
