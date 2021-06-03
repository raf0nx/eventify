<?php

namespace Tests\Feature;

use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Mockery;
use Tests\TestCase;

class EmailVerificationTest extends TestCase {
    use RefreshDatabase;

    public function test_email_verify() {
        // arrange
        $user = TestCase::createUser();
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addSeconds(60),
            [
                'id' => $user->id,
                'hash' => sha1($user->email)
            ]
        );

        // act
        Event::fake();

        $response = $this->actingAs($user)->get($verificationUrl);

        // assert
        Event::assertDispatched(Verified::class);
        $this->assertTrue($user->fresh()->hasVerifiedEmail());
        $response->assertRedirect(RouteServiceProvider::HOME . '?verified=1');
    }

    public function test_redirect_if_email_verified() {
        // arrange
        $user = (object)Mockery::mock(Authenticatable::class);
        $url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => 1,
                'hash' => sha1('taylor@laravel.com'),
            ]
        );

        // expect
        $user->shouldReceive('getKey')->andReturn(1);
        $user->shouldReceive('getAuthIdentifier')->andReturn(1);
        $user->shouldReceive('getEmailForVerification')->andReturn('taylor@laravel.com');
        $user->shouldReceive('hasVerifiedEmail')->andReturn(true);
        $user->shouldReceive('markEmailAsVerified')->never();

        // act
        $response = $this->actingAs($user)->get($url);

        // assert
        $response->assertStatus(302);
    }

    public function test_email_verification_sent() {
        // arrange
        $user = (object)Mockery::mock(Authenticatable::class);

        // expect
        $user->shouldReceive('hasVerifiedEmail')->andReturn(false);
        $user->shouldReceive('getAuthIdentifier')->andReturn(1);
        $user->shouldReceive('sendEmailVerificationNotification')->once();

        //act
        $response = $this->from('/')
            ->actingAs($user)
            ->post('/email/verification-notification');

        //assert
        $response->assertStatus(202);
    }

    public function test_email_is_not_verified_with_invalid_hash() {
        // arrange
        $user = TestCase::createUser();
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addSeconds(60),
            [
                'id' => $user->id,
                'hash' => sha1('bad@email.com')
            ]
        );

        // act
        $response = $this->actingAs($user)->get($verificationUrl);

        // assert
        $response->assertStatus(403);
        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    public function test_email_is_not_verified_with_invalid_id() {
        // arrange
        $user = TestCase::createUser();
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addSeconds(60),
            ['id' => 99999, 'hash' => sha1($user->email)]
        );

        // act
        $response = $this->actingAs($user)->get($verificationUrl);

        // assert
        $response->assertStatus(403);
        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    public function test_resend_email_verification_link() {
        // arrange
        $user = TestCase::createUser();

        // act
        $response = $this->actingAs($user)->post('email/verification-notification', ['id' => $user->id]);

        // assert
        $response->assertStatus(202);
    }

    public function test_cannot_resend_verification_link_for_unauthenticated_user() {
        // act
        $response = $this->post('email/verification-notification');

        // assert
        $response->assertUnauthorized();
    }
}