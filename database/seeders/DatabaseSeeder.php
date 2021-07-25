<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {
        if ($this->command->confirm('Do you want to refresh the database?', true)) {
            $this->command->call('migrate:refresh');
            $this->command->info('Database was successfully refreshed');
        }

        $this->call([
            UsersSeeder::class,
            EventsSeeder::class,
            UsersEventsSeeder::class,
        ]);
    }
}
