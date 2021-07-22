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
            return;
        }

        User::all()->each(function(User $user) {
            $take = random_int(0, 2);
            $events = Event::inRandomOrder()->take($take)->get()->pluck('id');
            $user->events()->sync($events);
        });
    }
}
