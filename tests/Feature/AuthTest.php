<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase {
    use RefreshDatabase;

    public function test_get_user() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->actingAs($user)->get("/api/user");

        // THEN
        $response->assertOk();
    }

    public function test_get_user_unauthenticated() {
        // WHEN
        $response = $this->get("/api/user");

        // THEN
        $response->assertUnauthorized();
    }

    public function test_authenticate_user() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->post("/login", ["email" => $user->email, "password" => "password"]);

        // THEN
        $this->assertAuthenticated();
        $response->assertOk();
    }

    public function test_authenticate_user_with_wrong_credentials() {
        // WHEN
        $response = $this->post("/login", ["email" => 'wrong@email.com', "password" => "wrong_password"]);

        // THEN
        $response->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    'password' => array(
                        0 => 'Email or password are incorrect!',
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
                    'email' => array(
                        0 => 'The email field is required.',
                    ),
                    'password' => array(
                        0 => 'The password field is required.',
                    ),
                ],
            ]);
    }

    public function test_create_user() {
        // GIVEN
        $user = User::factory()->make();

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
                    'name' => array(
                        0 => 'The name field is required.',
                    ),
                    'email' => array(
                        0 => 'The email field is required.',
                    ),
                    'password' => array(
                        0 => 'The password field is required.',
                    ),
                ],
            ]);
    }

    public function test_password_confirmation_for_registration() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->post("/register", ["email" => $user->email, "name" => $user->name, "password" => $user->password, "password_confirmation" => 'random_password']);

        // THEN
        $response->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    'password' => array(
                        0 => 'The password confirmation does not match.',
                    ),
                ],
            ]);
    }

    public function test_logout() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->actingAs($user)->post('/logout');

        // THEN
        $response->assertNoContent();
    }

}
