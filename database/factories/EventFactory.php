<?php

namespace Database\Factories;

use App\Models\Event;
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
    public function definition(): array {
        return [
            'name' => $this->faker->unique()->name,
            'description' => $this->faker->text(100),
            'event_image' => 'image.png',
            'start_datetime' => $this->faker->date(),
        ];
    }
}
