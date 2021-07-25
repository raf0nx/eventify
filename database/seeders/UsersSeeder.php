<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $userCount = max((int) $this->command->ask('How many users would you like to seed', 20), 1);
        User::factory()->count($userCount)->create();
        User::factory()->unverified()->create();
    }
}
