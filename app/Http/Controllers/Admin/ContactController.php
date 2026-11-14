<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/contacts/index', [
            'contacts' => Contact::latest()->get(),
        ]);
    }

    public function reply(Request $request, Contact $contact): RedirectResponse
    {
        $data = $request->validate([
            'reply' => ['required', 'string', 'max:5000'],
        ]);

        try {
            Mail::raw($data['reply'], function ($message) use ($contact) {
                $message->to($contact->email, $contact->name)
                    ->subject('Re: ' . $contact->subject);
            });
        } catch (\Throwable $e) {
            report($e);

            return back()->withErrors([
                'reply' => 'Email gagal dikirim. Periksa pengaturan MAIL_* di file .env.',
            ]);
        }

        // Balasan baru disimpan setelah email berhasil dikirim.
        $contact->update(['reply' => $data['reply'], 'replied_at' => now()]);

        return back();
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return back();
    }
}
