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
        Schema::create('expected_donors', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('name');
            $table->string('email');
            $table->integer('times_donated');
            $table->string('profile_picture')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expected_donors');
    }
};
