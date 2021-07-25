<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventsSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $eventCount = (int) $this->command->ask('How many events would you like to seed', 50);
        Event::factory()->count($eventCount)->create();
    }
}
