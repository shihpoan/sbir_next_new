export default function TestLayout({
    children, // will be a page or nested layout
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav>嘎嘎嘎，我是水哥</nav>

            {children}
        </section>
    );
}
