import React, {useState, useRef, useEffect} from 'react';

function Dropdown({ items, multiSelect=false}) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const [title, setTitle] = useState('Select');
    const toggle = () => setOpen(!open);
    const node = useRef();

    useEffect(() => {
        /* Add when mounted */
        document.addEventListener("mousedown", handleClickOutside);

        /* return function to be called when unmounted */
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = e => {
        /* Click Inside Component */
        if (node.current.contains(e.target)) {
            return;
        }
        /* Click Outside Component */
        setOpen(false);
    };

    function handleOnClick(item) {
        /* Handles Selecting */
        if (!selection.some(current => current.id === item.id)) {
            if (!multiSelect) {
                setSelection([item]);
                setTitle([item.value]);
            }
            else if (multiSelect) {
                setSelection([ ...selection, item ]);
                setTitle(title.concat(item.value).replace('Select', ''));
            }
        }
        /* Handles Deselecting */
        else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([ ...selectionAfterRemoval ]);
            if (!multiSelect) {
                setTitle('Select');
            }
            else {
                if (selectionAfterRemoval.length) {
                    setTitle(title.replace(item.value, ''));
                }
                else {
                    setTitle('Select');
                }
            }
        }
    }

    function isItemInSelection(item) {
        if (selection.find(current => current.id === item.id)) {
            return true;
        }
        return false;
    }

    function toggleAll() {
        if (selection.length) {
            setSelection([]);
            setTitle('Select');
        }
        else {
            var t = '';
            var s = []
            items.forEach(function (item) {
                t += item.value;
                s.push(item);
            })
            setTitle(t);
            setSelection(s);
        }
    }

    return (
        <div className="dd-wrapper" ref={node}>
            <div tabIndex={0} className="dd-header" >
                <div className="dd-header_title" role="button" onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
                    <p className="dd-header_title-text">{title}</p>
                    <div className="dd-header_action">
                        <p>{open ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}</p>
                    </div>
                </div>
                {open && (
                    <ul className="dd-list">
                        {items.map(item => (
                            <li className="dd-list-item" key={item.id}>
                                <button type="button" onClick={() => handleOnClick(item)}>
                                    <span>{item.value}</span>
                                    <span>{isItemInSelection(item) && <span className="check">&#10003;</span>}</span>
                                </button>
                            </li>
                        ))}
                        {
                            /* Select All/Deselect All on MultiSelect */
                            multiSelect && (
                                <li className="dd-select-all">
                                    <button type="button" onClick={() => toggleAll()}>
                                        <span>Toggle Select All</span>
                                    </button>
                                </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Dropdown;