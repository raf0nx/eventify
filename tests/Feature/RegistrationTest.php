<?php

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationTest extends TestCase {
    use RefreshDatabase;

    public function test_create_user() {
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // THEN
        $response->assertCreated();
    }

    public function test_required_fields_for_registration() {
        // WHEN
        $response = $this->post("/register");

        // THEN
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
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => $user->password, "password_confirmation" => "random_password"]);

        // THEN
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
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // THEN
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
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", ["email" => 123, "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // THEN
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
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", ["email" => 'bad.email', "name" => $user->name, "password" => $user->password, "password_confirmation" => $user->password]);

        // THEN
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
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", [
            "email" => "someveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylong@email.com",
            "name" => $user->name,
            "password" => $user->password,
            "password_confirmation" => $user->password,
        ]
        );

        // THEN
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
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", ["email" => $user->email, "name" => 123, "password" => $user->password, "password_confirmation" => $user->password]);

        // THEN
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
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", [
            "email" => $user->email,
            "name" => "someveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylongName",
            "password" => $user->password,
            "password_confirmation" => $user->password,
        ]
        );

        // THEN
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

    public function test_password_is_string_for_registration() {
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => 12345678, "password_confirmation" => 12345678]);

        // THEN
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "password" => array(
                    0 => "The password must be a string.",
                ),
            ],
        ]);
    }

    public function test_password_min_length_for_registration() {
        // GIVEN
        $user = TestCase::makeUser();

        // WHEN
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => '123', "password_confirmation" => '123']);

        // THEN
        $response->assertStatus(422);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "password" => array(
                    0 => "The password must be at least 8 characters.",
                ),
            ],
        ]);
    }
}
