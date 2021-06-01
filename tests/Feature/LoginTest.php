<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase {
    use RefreshDatabase;

    public function test_authenticate_user() {
        // arrange
        $user = TestCase::createUser();

        // act
        $response = $this->post("/login", ["email" => $user->email, "password" => "password"]);

        // assert
        $this->assertAuthenticated();
        $response->assertOk();
    }

    public function test_authenticate_user_with_wrong_email() {
        // arrange
        TestCase::createUser();

        // act
        $response = $this->post("/login", ["email" => "wrong@email.com", "password" => "password"]);

        // assert
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
        // arrange
        $user = TestCase::createUser();

        // act
        $response = $this->post("/login", ["email" => $user->email, "password" => "wrong_password"]);

        // assert
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
        // act
        $response = $this->post("/login");

        // assert
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
        // arrange
        TestCase::createUser();

        // act
        $response = $this->post("/login", ["email" => 123, "password" => "password"]);

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

    public function test_password_is_string_for_login() {
        // arrange
        $user = TestCase::createUser();

        // act
        $response = $this->post("/login", ["email" => $user->email, "password" => 12345678]);

        // assert
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
        // arrange
        $user = TestCase::createUser();

        // act
        $response = $this->actingAs($user)->post("/logout");

        // assert
        $response->assertNoContent();
    }
}
