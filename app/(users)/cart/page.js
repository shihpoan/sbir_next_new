import React from 'react';
import Link from 'next/link';

function TestHome() {
    return (
        <div>
            <Link href='/blog'>
                TestHome
            </Link>
        </div>
    )
}

export default TestHome