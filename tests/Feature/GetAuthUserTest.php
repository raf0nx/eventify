<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GetAuthUserTest extends TestCase {
    use RefreshDatabase;
    
    public function test_get_user() {
        // arrange
        $user = TestCase::createUser();

        // act
        $response = $this->actingAs($user)->get("/api/user");

        // assert
        $response->assertOk();
    }

    public function test_get_user_unauthenticated() {
        // act
        $response = $this->get("/api/user");

        // assert
        $response->assertUnauthorized();
    }
}