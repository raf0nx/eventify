<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersEventsSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $eventsCount = Event::all()->count();

        if (!$eventsCount) {
            $this->command->error('No events found! Skipping assigning events to users.');
            return;
        }

        $eventsMin = (int) $this->command->ask('Choose the minimum number of events assigned to a user', 0);
        $eventsMax = abs(min((int) $this->command->ask('Choose the maximum number of events assigned to a user', 2), $eventsCount));

        User::all()->each(function (User $user) use ($eventsMin, $eventsMax) {
            $take = random_int($eventsMin, $eventsMax);
            $events = Event::inRandomOrder()->take($take)->get()->pluck('id');
            $user->events()->sync($events);
        });
    }
}
