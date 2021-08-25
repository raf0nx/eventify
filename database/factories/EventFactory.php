<?php

namespace Database\Factories;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory {
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array{
        return [
            'name' => $this->faker->unique()->word,
            'description' => $this->faker->text(2000),
            'image' => 'image.png',
            'start_datetime' => $this->faker->dateTimeBetween('now', '+5 years'),
        ];
    }

    /**
     * Indicate that the Event model should have present starting datetime
     */
    public function present(): Factory {
        return $this->state(function (): array{
            return [
                'start_datetime' => Carbon::now()->toDateTimeString(),
            ];
        });
    }
}
