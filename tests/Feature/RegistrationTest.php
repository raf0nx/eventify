<?php

namespace Tests\Feature;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;
use Tests\TestCase;

class RegistrationTest extends TestCase {
    use RefreshDatabase;

    public function test_create_user() {
        // arrange
        $user = TestCase::makeUser();

        // act
        Event::fake();
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // assert
        Event::assertDispatched(Registered::class);
        Event::assertListening(Registered::class, SendEmailVerificationNotification::class);
        $response->assertCreated();
    }

    public function test_required_fields_for_registration() {
        // act
        $response = $this->post("/register");

        // assert
        $response->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "name" => array(
                        0 => "The name field is required.",
                    ),
                    "email" => array(
                        0 => "The email field is required.",
                    ),
                    "password" => array(
                        0 => "The password field is required.",
                    ),
                ],
            ]);
    }

    public function test_password_confirmation_for_registration() {
        // arrange
        $user = TestCase::makeUser();

        // act
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => $user->password, "password_confirmation" => "random_password"]);

        // assert
        $response->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "password" => array(
                        0 => "The password confirmation does not match.",
                    ),
                ],
            ]);
    }

    public function test_email_uniqueness_for_registration() {
        // arrange
        $user = TestCase::createUser();

        // act
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // assert
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "email" => array(
                    0 => "The email has already been taken.",
                ),
            ],
        ]);
    }

    public function test_email_is_string_for_registration() {
        // arrange
        $user = TestCase::makeUser();

        // act
        $response = $this->post("/register", ["email" => 123, "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // assert
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "email" => array(
                    0 => "The email must be a string.",
                ),
            ],
        ]);
    }

    public function test_valid_email_address_for_registration() {
        // arrange
        $user = TestCase::makeUser();

        // act
        $response = $this->post("/register", ["email" => 'bad.email', "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // assert
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "email" => array(
                    0 => "The email must be a valid email address.",
                ),
            ],
        ]);
    }

    public function test_email_max_length_for_registration() {
        // arrange
        $user = TestCase::makeUser();

        // act
        $response = $this->post("/register", [
            "email" => Str::random(244) . '@example.com',
            "name" => $user->name,
            "password" => $user->password,
            "password_confirmation" => $user->password,
        ]
        );

        // assert
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "email" => array(
                    0 => "The email must not be greater than 255 characters.",
                ),
            ],
        ]);
    }

    public function test_name_is_string_for_registration() {
        // arrange
        $user = TestCase::makeUser();

        // act
        $response = $this->post("/register", ["email" => $user->email, "name" => 123, "password" => $user->password, "password_confirmation" => $user->password]);

        // assert
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "name" => array(
                    0 => "The name must be a string.",
                ),
            ],
        ]);
    }

    public function test_name_max_length_for_registration() {
        // arrange
        $user = TestCase::makeUser();

        // act
        $response = $this->post("/register", [
            "email" => $user->email,
            "name" => Str::random(256),
            "password" => $user->password,
            "password_confirmation" => $user->password,
        ]
        );

        // assert
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "name" => array(
                    0 => "The name must not be greater than 255 characters.",
                ),
            ],
        ]);
    }

    public function test_password_is_valid() {
        // arrange
        $user = TestCase::makeUser();

        // act
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => 123, "password_confirmation" => 123]);

        // assert
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "password" => array(
                    0 => "The password must be a string.",
                    1 => "The password must be at least 8 characters and contain at least one uppercase character, one number, and one special character.",
                ),
            ],
        ]);
    }
}
