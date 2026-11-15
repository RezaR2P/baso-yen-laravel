import { Head, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fieldClass =
    "w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export default function Kontak() {
    const form = useForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post("/kontak", {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <>
            <Head title="Hubungi Kami" />
            <div className="mx-auto max-w-xl px-5 py-12">
                <h1 className="text-3xl font-extrabold">Hubungi Kami</h1>
                <p className="mt-2 text-cocoa/70">
                    Kirim pertanyaan atau permintaan Anda, kami akan membalas
                    lewat email.
                </p>

                {form.recentlySuccessful && (
                    <p
                        role="status"
                        className="mt-6 rounded-md border border-green-700/30 bg-green-100 p-3 text-sm text-green-800"
                    >
                        Terima kasih! Pesan Anda sudah terkirim.
                    </p>
                )}

                <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            className="bg-white"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                        />
                        <InputError message={form.errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            className="bg-white"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData("email", e.target.value)
                            }
                        />
                        <InputError message={form.errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">No. telepon (opsional)</Label>
                        <Input
                            id="phone"
                            className="bg-white"
                            value={form.data.phone}
                            onChange={(e) =>
                                form.setData("phone", e.target.value)
                            }
                        />
                        <InputError message={form.errors.phone} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Subjek</Label>
                        <Input
                            id="subject"
                            className="bg-white"
                            value={form.data.subject}
                            onChange={(e) =>
                                form.setData("subject", e.target.value)
                            }
                        />
                        <InputError message={form.errors.subject} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Pesan</Label>
                        <textarea
                            id="message"
                            rows={6}
                            className={fieldClass}
                            value={form.data.message}
                            onChange={(e) =>
                                form.setData("message", e.target.value)
                            }
                        />
                        <InputError message={form.errors.message} />
                    </div>
                    <Button
                        type="submit"
                        disabled={form.processing}
                        className="w-fit rounded-full bg-brand px-8 text-white hover:bg-brand/90"
                    >
                        Kirim Pesan
                    </Button>
                </form>
            </div>
        </>
    );
}
