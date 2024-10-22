'use client'; // directive to initiate client side component

import { useState } from 'react'; // hook for form value management

export default function StreamList() {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null); // Track which item is being edited
    const [editValue, setEditValue] = useState(''); // Store new value for the item being edited

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setItems([...items, {text: inputValue, completed: false } ]); // Append new value to items list
            setInputValue('');
        }
    };

    // function for list item deletion
    const handleDelete = (index) => {
        const updatedItems = items.filter((_, i) => i !== index); // remove selected item from list
        setItems(updatedItems);
    }

    // Enable editing mode for a specific item
    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditValue(items[index].text); // Set initial value to current item value
    };

    // Save the edited value and update the items array
    const handleSave = (index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, text: editValue } : item
        );
        setItems(updatedItems);
        setEditingIndex(null); // Exit editing mode
    };

    // Cancel editing and exit edit mode
    const handleCancel = () => {
        setEditingIndex(null);
        setEditValue(''); // Clear the edit input
    };

    // Function to complete a list item
    const handleComplete = (index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
        );
        setItems(updatedItems);
    };

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
                        <li
                            key={index}
                            className={`list-item ${item.completed ? 'completed' : ''}`}
                        >
                            {editingIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleSave(index)}
                                        aria-label="Save item"
                                    >
                                        Save
                                    </button>
                                    <button onClick={handleCancel} aria-label="Cancel edit">
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>{item.text}</span>

                                    <button
                                        onClick={() => handleDelete(index)}
                                        aria-label="Delete item"
                                        className="delete-button"
                                    >
                                        <span className="material-symbols-outlined icon-delete">
                                            delete
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handleEdit(index)}
                                        aria-label="Edit item"
                                        className="edit-button"
                                    >
                                        <span class="material-symbols-outlined icon-edit">
                                            edit
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleComplete(index)}
                                        aria-label="Complete item"
                                        className="complete-button">
                                        <span class="material-symbols-outlined icon-complete">
                                            check
                                        </span>
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}