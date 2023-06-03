import React, { useState } from "react";
import axios from "axios";
import "./search.css";
import { useNavigate } from "react-router-dom";


const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`)

        // try {
        //     const response = await axios.get(
        //         `http://localhost:2000/product/getProducts?keyword=${keyword}`
        //     );
        //     const searchResults = response.data;
        //     // onSearchResults(searchResults);
        //     console.log(searchResults,"in search")

        // } catch (error) {
        //     console.error("Error searching for products:", error);
        // }
    };

    return (
        <form className="searchBox" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search a Product ..."
                value={keyword}
                onChange={handleInputChange}
            />
            <input type="submit" value="Search" />
        </form>

    );
};

export default Search;
