<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase {
    use RefreshDatabase;

    public function test_authenticate_user() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->post("/login", ["email" => $user->email, "password" => "password"]);

        // THEN
        $this->assertAuthenticated();
        $response->assertOk();
    }

    public function test_authenticate_user_with_wrong_email() {
        // GIVEN
        TestCase::createUser();

        // WHEN
        $response = $this->post("/login", ["email" => "wrong@email.com", "password" => "password"]);

        // THEN
        $response->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "password" => array(
                        0 => "Email or password are incorrect!",
                    ),

                ],
            ]);
    }

    public function test_authenticate_user_with_wrong_password() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->post("/login", ["email" => $user->email, "password" => "wrong_password"]);

        // THEN
        $response->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "password" => array(
                        0 => "Email or password are incorrect!",
                    ),

                ],
            ]);
    }

    public function test_required_fields_for_login() {
        // WHEN
        $response = $this->post("/login");

        // THEN
        $response->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "email" => array(
                        0 => "The email field is required.",
                    ),
                    "password" => array(
                        0 => "The password field is required.",
                    ),
                ],
            ]);
    }

    public function test_email_is_string_for_login() {
        // GIVEN
        TestCase::createUser();

        // WHEN
        $response = $this->post("/login", ["email" => 123, "password" => "password"]);

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

    public function test_password_is_string_for_login() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->post("/login", ["email" => $user->email, "password" => 12345678]);

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

    public function test_logout() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->actingAs($user)->post("/logout");

        // THEN
        $response->assertNoContent();
    }
}
