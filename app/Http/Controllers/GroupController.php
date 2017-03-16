<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;

class GroupController extends ApiController
{
    public function index(){
        $groups = $this->user()->groups()->get();
        return $this->setStatusCode(200)->respond($groups);
    }

    public function create(Request $request) {
        $group = $this->user()->groups()->create([]);
        return $this->setStatusCode(200)->respond($group);
    }

    public function show(Group $group){
        $this->authorize('getGroup', [$group]);
        $group->load('users');
        return $this->setStatusCode(200)->respond($group);
    }

    public function update(Request $request, Group $group) {
        $this->authorize('updateGroup', [$group]);
        $group->update($request->all());
        return $this->setStatusCode(200)->respond($group);
    }

    public function destroy(Group $group) {
        $this->authorize('deleteGroup', [$group]);
        $group->delete();
        return $this->setStatusCode(200)->respond();
    }
}
