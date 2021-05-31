<?php

namespace Tests\Feature;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Events\Verified;
use Tests\TestCase;

class EmailVerificationTest extends TestCase {
    use RefreshDatabase;

    public function test_email_verify() {
        // GIVEN
        $user = TestCase::createUser();
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addSeconds(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        // WHEN
        Event::fake();

        $response = $this->actingAs($user)->get($verificationUrl);

        // THEN
        Event::assertDispatched(Verified::class);
        $this->assertTrue($user->fresh()->hasVerifiedEmail());
        $response->assertRedirect(RouteServiceProvider::HOME . '?verified=1');
    }

    public function test_email_is_not_verified_with_invalid_hash() {
        // GIVEN
        $user = TestCase::createUser();
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addSeconds(60),
            ['id' => $user->id, 'hash' => sha1('bad@email.com')]
        );

        // WHEN
        $response = $this->actingAs($user)->get($verificationUrl);

        // THEN
        $response->assertStatus(403);
        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    public function test_email_is_not_verified_with_invalid_id() {
        // GIVEN
        $user = TestCase::createUser();
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addSeconds(60),
            ['id' => 99999, 'hash' => sha1($user->email)]
        );

        // WHEN
        $response = $this->actingAs($user)->get($verificationUrl);

        // THEN
        $response->assertStatus(403);
        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    public function test_resend_email_verification_link() {
        // GIVEN
        $user = TestCase::createUser();

        // WHEN
        $response = $this->actingAs($user)->post('email/verification-notification', ['id' => $user->id]);

        // THEN
        $response->assertStatus(202);
    }

    public function test_cannot_resend_verification_link_for_unauthenticated_user() {
        // WHEN
        $response = $this->post('email/verification-notification');

        // THEN
        $response->assertUnauthorized();
    }
}