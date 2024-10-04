'use client'; // directive to initiate client side component

import { useState } from 'react'; // hook for form value management

export default function StreamList() {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Input:', inputValue);
        setInputValue('');
    };

    return (
        <div id="streamlist-form">
            <h1>Welcome to StreamList</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add to StreamList"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit"><span class="material-symbols-outlined">add</span></button>
            </form>
        </div>
    );
}