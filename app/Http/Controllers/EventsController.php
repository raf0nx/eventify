<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEventRequest;
use App\Http\Resources\EventCollection;
use App\Models\Event;
use Carbon\Carbon;

class EventsController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return EventCollection::collection(Event::all()->where('start_datetime', '>=', Carbon::now()->toDateTimeString())->sortBy('start_datetime'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        return new EventCollection(Event::findOrFail($id));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateEventRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateEventRequest $request) {
        $event = new EventCollection(Event::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image ?? null,
            'start_datetime' => $request->start_datetime,
        ]));

        return $event->response()->setStatusCode(201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\CreateEventRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateEventRequest $request, $id) {
        $event = new EventCollection(Event::findOrFail($id));
        $event->update([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image ?? null,
            'start_datetime' => $request->start_datetime,
        ]);

        return $event->response()->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $event = Event::findOrFail($id);
        $event->delete();

        return response(null, 200);
    }
}
