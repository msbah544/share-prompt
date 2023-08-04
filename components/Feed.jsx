"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptsCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_card">
      {data.map((item) => {
        <PromptCard key={item._id} handleTagClick={handleTagClick} />;
        {/}
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          required
          placeholder="search for a tag or a username"
          className="search_input "
          value={searchText}
          onChange={handleInput}
        />
      </form>
      <PromptsCardList data={[]} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
