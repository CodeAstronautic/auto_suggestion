import React, { useEffect, useState } from "react";

const Autocomplete = (props) => {
    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [input, setInput] = useState("");
    const [productData, setProductData] = useState([])
    const [keyState, setKeyState] = useState(false);
    const [spaceKey, setSpaceKey] = useState(true);

    const onChange = (e) => {
        const { suggestions } = props;
        const input = e.currentTarget.value;
        const newFilteredSuggestions = suggestions.filter(
            (suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
        setActive(0);
        setFiltered(newFilteredSuggestions);
        setIsShow(true);
        setInput(e.currentTarget.value);
    };

    useEffect(() => {
        const text = input?.split('.');
        if (text?.length && keyState && productData) {
            const search = text[text.length - 1];
            const filterd = productData.filter(res => res.toLowerCase().includes(search.toLowerCase()));
            setFiltered(filterd)
        }
    }, [input, productData, keyState])

    useEffect(() => {
        const text = input?.split(' ');
        console.log(spaceKey,text,"spaceKeyspaceKey")
        if (text?.length && spaceKey && props.suggestions) {
            const search = text[text.length - 1];
            console.log(search);
            const newFilteredSuggestions = props.suggestions.filter(
                (suggestion) => suggestion.toLowerCase().indexOf(search.toLowerCase()) > -1
            );
            console.log(newFilteredSuggestions,"newFilteredSuggestionsnewFilteredSuggestions")
            setActive(0);
            setFiltered(newFilteredSuggestions);
        }
    }, [spaceKey, input])

    const onClick = (e) => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);
        let text_search
        if (keyState) {
            text_search = input.split(".")
            text_search[text_search.length - 1] =  e;
            setInput(text_search.join('.'))
        } else {
            text_search = input.split(" ")
            text_search[text_search.length - 1] = e;
            setInput(text_search.join(' '))
        }
    };

    const onKeyDown = (e) => {
        console.log(e.keyCode);
        if(e.keyCode ===18) {
            setKeyState(false);
            setSpaceKey(false);
            setFiltered([])
        }
        if (e.keyCode == 32) {
            setKeyState(false);
            setSpaceKey(true)
            setFiltered([]);
        }
        if (e.keyCode === 190) {
            const text_search = input.split(".");
            console.log(text_search)
            const country = text_search[text_search.length - 1].split(' ');
            const countrry_text_esrach = country[country.length - 1].trim();
            const productList = props.products[countrry_text_esrach];
            setProductData(productList);
            setKeyState(true)
            setSpaceKey(false)
        }
        if (e.keyCode === 13) {
            setActive(0);
            setIsShow(false);
            setInput(filtered[active]);
        } else if (e.keyCode === 38) {
            return active === 0 ? null : setActive(active - 1);
        } else if (e.keyCode === 40) {
            return active - 1 === filtered.length ? null : setActive(active + 1);
        }
    };
    const renderAutosuggest = () => {
        if (isShow && input) {
            if (filtered.length) {
                return (
                    <ul className="autocomplete">
                        {filtered.map((suggestion, index) => {
                            let className;
                            if (index === active) {
                                className = "active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={() => onClick(suggestion)}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className="no-autocomplete">
                        <em>Not found</em>
                    </div>
                );
            }
        }
        return <></>;
    };

    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
                placeholder="Search here anything"
            />
            {renderAutosuggest()}
        </>
    );
};

export default Autocomplete;
