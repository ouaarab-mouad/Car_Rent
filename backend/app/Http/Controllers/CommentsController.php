<?php

namespace App\Http\Controllers;
use App\Models\Avis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class CommentsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'comment' => 'required|string|min:3|max:1000',
            'loueur_id' => 'required|integer|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
        ], [
            'comment.required' => 'The comment field is required.',
            'comment.min' => 'The comment must be at least :min characters.',
            'rating.required' => 'Please select a rating.',
            'rating.integer' => 'Rating must be a number.',
            'rating.min' => 'Rating must be at least 1 star.',
            'rating.max' => 'Rating cannot be more than 5 stars.',
        ]);

        try {
            $client_id = auth()->id();

            if (!$client_id) {
                return response()->json([
                    'message' => 'You must be logged in to submit a comment',
                ], 401);
            }

            $hasCommented = Avis::where('client_id', $client_id)
                ->where('loueur_id', $validated['loueur_id'])
                ->exists();

            if ($hasCommented) {
                return response()->json([
                    'message' => 'You have already commented on this loueur.',
                ], 400);
            }

            $comment = Avis::create([
                'loueur_id' => (int)$validated['loueur_id'],
                'client_id' => $client_id,
                'description' => $validated['comment'],
                'etoiles' => (int)$validated['rating'],
            ]);

            $comment->load('client');

            return response()->json([
                'message' => 'Comment added successfully',
                'data' => $comment
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Error creating comment: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to add comment',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function index($id,Request $request){

        $comments= Avis::where('loueur_id',$id)->get();
        foreach ($comments as $comment) {

            $user=User::find($comment->client_id);

            $name=$user->nom.' '.$user->prenom;
            $comment->user=$name;
            unset($comment->updated_at,$comment->loueur_id,$comment->client_id);
        }

        return response()->json($comments);
    }
}
