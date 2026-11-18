import { Form, Head, Link } from "@inertiajs/react";
import type { ReactNode } from "react";
import InputError from "@/components/input-error";
import { store } from "@/routes/login";
import { request } from "@/routes/password";

type Props = {
    status?: string;
    canResetPassword: boolean;
};

const field =
    "h-12 w-full rounded-xl border-[1.5px] border-[#D9C3AE] bg-cream px-3.5 text-cocoa outline-none focus:border-cocoa focus:ring-2 focus:ring-cocoa/20";

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Masuk Admin" />

            <div className="min-h-screen bg-cream font-sans text-cocoa lg:grid lg:grid-cols-2">
                <aside className="hidden flex-col justify-between bg-cocoa p-12 text-sand lg:flex">
                    <div className="flex items-center gap-2.5 text-2xl font-extrabold text-cream">
                        <span
                            aria-hidden="true"
                            className="size-9 rounded-[10px] bg-brand"
                        />
                        Baso Yen
                    </div>
                    <div className="space-y-4">
                        <h2 className="max-w-md text-4xl font-extrabold leading-tight text-cream">
                            Kelola produk, resep, dan artikel dari satu tempat.
                        </h2>
                        <p className="max-w-md text-sand">
                            Panel admin website Baso Yen.
                        </p>
                    </div>
                    <p className="text-sm">
                        © {new Date().getFullYear()} Baso Yen
                    </p>
                </aside>

                <div className="flex min-h-screen items-center justify-center px-4 py-10 lg:min-h-0">
                    <div className="w-full max-w-md space-y-8">
                        <div className="lg:hidden flex items-center gap-2 text-xl font-extrabold">
                            <span
                                aria-hidden="true"
                                className="size-8 rounded-[9px] bg-brand"
                            />
                            Baso Yen
                        </div>

                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">
                                Masuk Admin
                            </h1>
                            <p className="text-muted">
                                Masukkan email dan kata sandi Anda.
                            </p>
                        </div>

                        {status && (
                            <div className="rounded-xl bg-[#DDF0E5] px-4 py-3 text-sm font-semibold text-[#1B5E3B]">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={["password"]}
                            className="flex flex-col gap-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-1.5">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-semibold"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            placeholder="email@contoh.com"
                                            className={field}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor="password"
                                                className="text-sm font-semibold"
                                            >
                                                Kata sandi
                                            </label>
                                            {canResetPassword && (
                                                <Link
                                                    href={request()}
                                                    className="text-sm font-semibold text-brand"
                                                >
                                                    Lupa kata sandi?
                                                </Link>
                                            )}
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="current-password"
                                            placeholder="Kata sandi"
                                            className={field}
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <label className="flex items-center gap-3 text-sm font-medium">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            className="size-4 accent-[#b3261e]"
                                        />
                                        Ingat saya
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        data-test="login-button"
                                        className="min-h-12 rounded-full bg-brand px-7 font-bold text-white hover:bg-brand-dark disabled:opacity-60"
                                    >
                                        {processing ? "Memproses…" : "Masuk"}
                                    </button>
                                </>
                            )}
                        </Form>

                        <Link
                            href="/"
                            className="inline-block text-sm font-semibold text-muted hover:text-cocoa"
                        >
                            ← Kembali ke website
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

// Tanpa layout bawaan starter kit: halaman ini mengatur tampilannya sendiri.
Login.layout = (page: ReactNode) => page;
