<?php

namespace Tests\Feature;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class EventControllerTest extends TestCase {
    use RefreshDatabase;

    public function test_get_events() {
        // Arrange
        $user = TestCase::createUser();
        TestCase::createEvent(10);
        $firstEvent = Event::factory()->present()->create();

        // Act
        $response = $this->actingAs($user)->get('/api/events');

        // Assert
        $response->assertOk();
        $response->assertJson(function (AssertableJson $json) use ($firstEvent) {
            $json->has(11)
                ->first(function ($json) use ($firstEvent) {
                    $json->where('start_datetime', $firstEvent['start_datetime'])
                        ->where('id', $firstEvent['id'])
                        ->etc();
                });
        });
    }

    public function test_create_event() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => $event->description, 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        // Assert
        $response->assertCreated();
    }

    public function test_required_fields_for_event_creation() {
        // Arrange
        $user = TestCase::createUser();

        // Act
        $response = $this->actingAs($user)->post('/api/events/');

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'name' => array(
                    0 => 'The name field is required.',
                ),
                'description' => array(
                    0 => 'The description field is required.',
                ),
                'start_datetime' => array(
                    0 => 'The start datetime field is required.',
                ),
            ],
        ]);
    }

    public function test_event_name_should_be_string() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => 123, 'description' => $event->description, 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'name' => array(
                    0 => 'The name must be a string.',
                ),
            ],
        ]);
    }

    public function test_event_name_should_be_unique() {
        // Arrange
        $user = TestCase::createUser();
        $event = Event::factory()->create();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => $event->description, 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'name' => array(
                    0 => 'The name has already been taken.',
                ),
            ],
        ]);
    }

    public function test_event_name_min_characters() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => Str::random(1), 'description' => $event->description, 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'name' => array(
                    0 => 'The name must be at least 2 characters.',
                ),
            ],
        ]);
    }

    public function test_event_name_max_characters() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => Str::random(256), 'description' => $event->description, 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'name' => array(
                    0 => 'The name must not be greater than 255 characters.',
                ),
            ],
        ]);
    }

    public function test_event_description_should_be_string() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => 123, 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'description' => array(
                    0 => 'The description must be a string.',
                ),
            ],
        ]);
    }

    public function test_event_description_min_characters() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => Str::random(9), 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'description' => array(
                    0 => 'The description must be at least 10 characters.',
                ),
            ],
        ]);
    }

    public function test_event_description_max_characters() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => Str::random(65536), 'image' => $event->image, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'description' => array(
                    0 => 'The description must not be greater than 65535 characters.',
                ),
            ],
        ]);
    }

    public function test_event_datetime_should_be_date() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => $event->description, 'image' => $event->image, 'start_datetime' => 'simple string']);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'start_datetime' => array(
                    0 => 'The start datetime is not a valid date.',
                    1 => 'The start time of the event cannot be earlier than the current time.',
                ),
            ],
        ]);
    }

    public function test_event_datetime_gte_current_time() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => $event->description, 'image' => $event->image, 'start_datetime' => Carbon::now()->subHour()->toDateTimeString()]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'start_datetime' => array(
                    0 => 'The start time of the event cannot be earlier than the current time.',
                ),
            ],
        ]);
    }

    public function test_event_image_should_be_string() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => $event->description, 'image' => 123, 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'image' => array(
                    0 => 'The image must be a string.',
                ),
            ],
        ]);
    }

    public function test_event_image_max_characters() {
        // Arrange
        $user = TestCase::createUser();
        $event = TestCase::makeEvent();

        // Act
        $response = $this->actingAs($user)->post('/api/events/', ['name' => $event->name, 'description' => $event->description, 'image' => Str::random(256), 'start_datetime' => $event->start_datetime]);

        //Assert
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'image' => array(
                    0 => 'The image must not be greater than 255 characters.',
                ),
            ],
        ]);
    }
}