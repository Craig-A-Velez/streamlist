'use client'; // directive to initiate client side component

import { useState } from 'react'; // hook for form value management

export default function StreamList() {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Input:', inputValue);
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue]); // Append new value to items list
            setInputValue('');
        }
    };

    // function for list item deletion
    const handleDelete = (index) => {
        const updatedItems = items.filter((_, i) => i !== index); // remove selected item from list
        setItems(updatedItems);
    }

    return (
        <div id="container">
            <div id="streamlist-form">
                <h1>Welcome to StreamList</h1>
                <p>Enter a movie name below to add it to your watch list.</p>
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
            <div id="watchlist">
                <h1>Your Watch List</h1>
                <ul>
                    {items.map((item, index) => (
                        <li key={index} className="list-item">
                            <span>{item}</span>
                            <button
                                onClick={() => handleDelete(index)}
                                aria-label="Delete item"
                                className="delete-button"
                            >
                                <span className="material-symbols-outlined icon-delete">delete</span>
                            </button>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
        
    );
}