<?php

namespace Tests;

use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    static function createUser() {
        return User::factory()->unverified()->create();
    }

    static function makeUser() {
        return User::factory()->make();
    }

    static function createEvent(int $count) {
        return Event::factory()->count($count)->create();
    }

    static function makeEvent() {
        return Event::factory()->make();
    }
}
