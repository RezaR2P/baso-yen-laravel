import { Head, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Ganti dengan data Baso Yen yang sebenarnya.
const contactInfo = {
    address: "[Alamat lengkap]",
    hours: "[Hari dan jam buka]",
    phone: "[Nomor telepon / WhatsApp]",
    email: "[email@contoh.com]",
};

// Tempel alamat "src" dari Google Maps → Bagikan → Sematkan peta.
const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.850725844108!2d107.5980416!3d-6.9084465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e615562b643b%3A0xd3dd8dfb0a2f5cf2!2sBaso%20YEN%20Meatball%20Factory!5e0!3m2!1sid!2sid!4v1794904363288!5m2!1sid!2sid";

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
            <div className="mx-auto max-w-5xl px-5 py-12">
                <h1 className="text-3xl font-extrabold md:text-4xl">
                    Hubungi Kami
                </h1>
                <p className="mt-2 text-cocoa/70">
                    Kirim pertanyaan atau permintaan Anda, kami akan membalas
                    lewat email.
                </p>

                <div className="mt-8 grid gap-10 md:grid-cols-2">
                    {/* Formulir */}
                    <div>
                        {form.recentlySuccessful && (
                            <p
                                role="status"
                                className="mb-4 rounded-md border border-green-700/30 bg-green-100 p-3 text-sm text-green-800"
                            >
                                Terima kasih! Pesan Anda sudah terkirim.
                            </p>
                        )}

                        <form onSubmit={submit} className="flex flex-col gap-4">
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
                                <Label htmlFor="phone">
                                    No. telepon (opsional)
                                </Label>
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

                    {/* Informasi lokasi */}
                    <aside className="flex flex-col gap-5">
                        <div className="rounded-2xl border border-sand bg-white p-6">
                            <h2 className="text-xl font-extrabold">
                                Lokasi Kami
                            </h2>
                            <dl className="mt-4 space-y-4 text-sm">
                                <div>
                                    <dt className="font-bold">Alamat</dt>
                                    <dd className="text-cocoa/70">
                                        {contactInfo.address}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-bold">Jam buka</dt>
                                    <dd className="text-cocoa/70">
                                        {contactInfo.hours}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-bold">
                                        Telepon / WhatsApp
                                    </dt>
                                    <dd className="text-cocoa/70">
                                        {contactInfo.phone}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-bold">Email</dt>
                                    <dd className="text-cocoa/70">
                                        {contactInfo.email}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {MAP_EMBED_URL && (
                            <iframe
                                title="Peta lokasi Baso Yen"
                                src={MAP_EMBED_URL}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="aspect-[4/3] w-full rounded-2xl border border-sand"
                            />
                        )}
                    </aside>
                </div>
            </div>
        </>
    );
}
