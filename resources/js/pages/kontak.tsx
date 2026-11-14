import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fieldClass =
    "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

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
            <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-6">
                <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:underline"
                >
                    ← Kembali ke beranda
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Hubungi Kami</h1>
                    <p className="text-muted-foreground">
                        Kirim pertanyaan atau permintaan Anda, kami akan
                        membalas lewat email.
                    </p>
                </div>

                {form.recentlySuccessful && (
                    <p className="rounded-md border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-700 dark:text-green-400">
                        Terima kasih! Pesan Anda sudah terkirim.
                    </p>
                )}

                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
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
                        className="w-fit"
                    >
                        Kirim Pesan
                    </Button>
                </form>
            </div>
        </>
    );
}
