<?php

use Tests\TestCase;

class GetAuthUserTest extends TestCase {
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
}